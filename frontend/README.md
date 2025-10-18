## Prompt Engineering for Amazon Listing Optimizer

This project uses Google Gemini to transform raw Amazon product data (title, bullets, description) into an optimized listing. High‑quality AI output depends on well‑crafted prompts and strict response formatting.

### Goals

- Generate a persuasive, SEO‑friendly title (<= 150 chars)
- Rewrite bullets to be clear, scannable and benefit‑oriented
- Enhance the description (3–5 short paragraphs)
- Produce 3–5 relevant keywords
- Return strictly valid JSON (no Markdown)

### Current System Prompt (backend/routes/optimize.js)

We build a single prompt that embeds the original content and gives precise instructions and a response schema:

```
You are an expert Amazon listing copywriter with deep knowledge of e-commerce optimization.

ORIGINAL CONTENT:
Title: <original title>
Feature Bullets:
1. <bullet 1>
2. <bullet 2>
...
Description: <original description>

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
}
```

### Prompt Engineering Rationale

- Provide full original context (title, bullets, description) to reduce hallucinations
- Use numbered requirements to constrain style and structure
- Add explicit constraints (≤150 chars for title; 3–5 paragraphs)
- Forbid Markdown so output is clean for UI and Amazon fields
- Enforce a strict JSON schema so the backend can parse reliably

### Practical Tips

- Keep temperature low (0.2–0.4) for consistent outputs
- If the model adds Markdown, strengthen the “plain text only” instruction
- Log raw AI responses in development to catch parsing issues
- Validate JSON before saving; on parse failure, retry with a shorter prompt

### Extending the Prompt

- Add brand tone: “Use a confident, helpful tone suitable for electronics”
- Add marketplace rules: “Avoid prohibited claims; no superlatives without support”
- Add keyword targets: “Incorporate these keywords naturally: <kw1>, <kw2>”

### File Location

- Prompt is assembled in `backend/routes/optimize.js` inside `buildOptimizationPrompt()`
