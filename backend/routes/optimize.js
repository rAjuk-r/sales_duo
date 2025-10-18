// Amazon Listing Optimizer - API Routes
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import { load } from "cheerio";
import mysql from "mysql2/promise";
import { MOCK_PRODUCTS } from "../database/mock-data.js";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const databasePool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const aiClient = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY,
});


function getAmazonProductDetails(asin) {
  for (let i = 0; i < MOCK_PRODUCTS.length; i++) {
    if (MOCK_PRODUCTS[i].asin === asin) {
      return MOCK_PRODUCTS[i];
    }
  }
  return {};
}

function buildOptimizationPrompt(productData) {
  const { title, bullets, description } = productData;
  const formattedBullets = bullets
    .map((bullet, index) => `${index + 1}. ${bullet}`)
    .join("\n");

  return `You are an expert Amazon listing copywriter with deep knowledge of e-commerce optimization.

ORIGINAL CONTENT:
Title: ${title}
Feature Bullets:
${formattedBullets}
Description: ${description}

OPTIMIZATION REQUIREMENTS:
1) Title: Create keyword-rich title (≤150 characters) that improves search visibility
2) Bullets: Rewrite feature bullets to be clear, compelling, and benefit-focused
3) Description: Enhance description with 3-5 short, persuasive paragraphs
4) Keywords: Suggest 3-5 relevant keywords for SEO

IMPORTANT: Use ONLY plain text - NO markdown formatting, bold text, asterisks, or special characters.

RESPONSE FORMAT:
Return only valid JSON in this exact format:
{
  "title": "optimized title here",
  "bullets": ["bullet 1", "bullet 2", "bullet 3"],
  "description": "optimized description here",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`;
}

// POST /api/optimize - Optimize Amazon listing using AI
router.post("/", async (req, res) => {
  try {
    const { asin } = req.body;

    if (!asin || typeof asin !== "string" || asin.trim().length === 0) {
      return res.status(400).json({
        error: "ASIN is required and must be a non-empty string",
      });
    }

    const originalProductData = getAmazonProductDetails(asin);

    if (!originalProductData || Object.keys(originalProductData).length === 0) {
      return res.status(404).json({
        error: `Product data not found for ASIN: ${asin}`,
      });
    }

    const optimizationPrompt = buildOptimizationPrompt(originalProductData);

    const aiResponse = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        "You are a helpful AI for optimizing Amazon listings.",
        optimizationPrompt,
      ],
      temperature: 0.3,
      maxOutputTokens: 800,
    });

    const aiText = aiResponse?.text?.trim();
    const jsonStart = aiText.indexOf("{");
    const jsonEnd = aiText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("AI response is not valid JSON:", aiText);
      return res.status(500).json({
        error: "AI response could not be parsed as JSON",
      });
    }

    const optimizedContent = JSON.parse(aiText.slice(jsonStart, jsonEnd + 1));

    const databaseConnection = await databasePool.getConnection();

    try {
      const [insertResult] = await databaseConnection.query(
        `INSERT INTO optimizations (asin, fetched, optimized, keywords, created_at)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [
          asin,
          JSON.stringify(originalProductData),
          JSON.stringify(optimizedContent),
          JSON.stringify(optimizedContent.keywords || []),
        ]
      );

      res.json({
        id: insertResult.insertId,
        asin,
        fetched: originalProductData,
        optimized: optimizedContent,
      });
    } finally {
      databaseConnection.release();
    }
  } catch (error) {
    console.error("Optimization error:", error);
    res.status(500).json({
      error: error.message || "Internal server error during optimization",
    });
  }
});

// GET /api/optimize/history/:asin - Retrieve optimization history
router.get("/history/:asin", async (req, res) => {
  try {
    const { asin } = req.params;

    if (!asin || typeof asin !== "string" || asin.trim().length === 0) {
      return res.status(400).json({
        error: "ASIN parameter is required and must be a non-empty string",
      });
    }

    const databaseConnection = await databasePool.getConnection();

    try {
      const [optimizationHistory] = await databaseConnection.query(
        `SELECT 
           id, 
           asin, 
           fetched, 
           optimized, 
           keywords, 
           created_at 
         FROM optimizations 
         WHERE asin = ? 
         ORDER BY created_at DESC`,
        [asin]
      );

      res.json(optimizationHistory);
    } finally {
      databaseConnection.release();
    }
  } catch (error) {
    console.error("Error fetching optimization history:", error);
    res.status(500).json({
      error: error.message || "Internal server error while fetching history",
    });
  }
});

export default router;

