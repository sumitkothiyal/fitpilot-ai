require("dotenv").config({
  path: require("path").resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 FitPilot Backend is LIVE");
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function callClaude(prompt) {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    return msg.content[0].text;
  } catch (err) {
    console.error(err);
    return "⚠️ AI unavailable";
  }
}

app.get("/test", async (req, res) => {
  const result = await callClaude("Say hello");
  res.json({ result });
});

app.post("/plan", async (req, res) => {
  const profile = req.body;

  const plan = await callClaude(`
Create a structured 7-day fitness plan for an Indian user.

Profile:
${JSON.stringify(profile)}

Each day must include:
Breakfast, Lunch, Dinner, Workout, Tips.
`);

  res.json({ plan });
});

let history = [];

app.post("/checkin", (req, res) => {
  history.push(req.body);
  res.json({ message: "Saved" });
});

app.get("/progress", (req, res) => {
  res.json(history);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 FitPilot running on port", PORT);
});