import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Delayed initialization helper for Gemini
  let aiClient: GoogleGenAI | null = null;
  function getAIClient(): GoogleGenAI {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      aiClient = new GoogleGenAI({ apiKey: key });
    }
    return aiClient;
  }

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/seo-analyze", async (req, res) => {
    const url = req.query.url as string;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      // 1. Fetch raw HTML
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
      const response = await fetch(targetUrl);
      const text = await response.text();

      // 2. Simple regex extraction (since we don't have JSDOM on server, and we promised a combo of client/server, wait, let's just extract on client and send to Gemini, or extract on server)
      // Actually, regex extracting for SEO is fine for title/description
      const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : null;

      const descMatch = text.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) 
                        || text.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
      const description = descMatch ? descMatch[1] : null;

      // Extract headings roughly
      const h1Count = (text.match(/<h1[^>]*>/ig) || []).length;
      const h2Count = (text.match(/<h2[^>]*>/ig) || []).length;

      // 3. AI Analysis
      const prompt = `Perform an SEO Content Analysis.
I am analyzing the URL: ${targetUrl}

Here is some basic metadata I found:
Title: ${title}
Description: ${description}
H1 Tags: ${h1Count}
H2 Tags: ${h2Count}

Provide a concise, practical SEO appraisal (max 4 bullet points) noting any missing meta tags, heading hierarchy issues, and accessibility improvements that can be inferred. Return strictly valid JSON in this format:
{
  "ai_analysis": "your summary text",
  "score": 85,
  "improvements": ["point 1", "point 2", "point 3"]
}`;
      
      const aiResponse = await getAIClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const aiResult = JSON.parse(aiResponse.text || "{}");

      res.json({
         title,
         description,
         h1Count,
         h2Count,
         ...aiResult
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to analyze URL or connect to AI" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
