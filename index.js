require("dotenv").config({
  path: require("path").resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Claude setup
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 🧠 AI call
async function callClaude(prompt) {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    return msg.content[0].text;

  } catch (err) {
    console.error("ERROR:", err);
    return "⚠️ AI unavailable";
  }
}

// 🧪 TEST
app.get("/test", async (req, res) => {
  const result = await callClaude("Say hello");
  res.json({ result });
});

// 📅 PLAN (FULL WEEKLY PLAN)
app.post("/plan", async (req, res) => {
  const profile = req.body;

  const plan = await callClaude(`
You are a professional Indian dietician and fitness coach.

Create a COMPLETE 7-day weekly fitness plan.

User Profile:
${JSON.stringify(profile)}

Rules:
- Respect diet preference (veg / non-veg)
- Consider age, gender, weight, goal

For EACH DAY provide:

DAY 1:
- Breakfast
- Lunch
- Dinner
- Workout
- Tips

Repeat for DAY 1 to DAY 7

Make it structured, clean, realistic, Indian-friendly.
`);

  res.json({ plan });
});

// 📊 MEMORY (simple in-memory store)
let history = [];

// ✅ Check-in
app.post("/checkin", (req, res) => {
  history.push(req.body);
  res.json({ message: "Saved" });
});

// 📈 Progress
app.get("/progress", (req, res) => {
  res.json(history);
});

// 🚀 START SERVER
app.listen(3000, () => {
  console.log("🚀 FitPilot running at http://localhost:3000");
});