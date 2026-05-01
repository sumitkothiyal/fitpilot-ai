require("dotenv").config({
  path: require("path").resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (FIXES "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 FitPilot Backend is LIVE");
});

// 🔐 Claude setup
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 🧠 Claude call
async function callClaude(prompt) {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    return msg.content[0].text;

  } catch (err) {
    console.error("CLAUDE ERROR:", err);
    return "⚠️ AI unavailable";
  }
}

// 🧪 TEST ROUTE
app.get("/test", async (req, res) => {
  const result = await callClaude("Say hello in one short sentence");
  res.json({ result });
});

// 📅 GENERATE WEEKLY PLAN
app.post("/plan", async (req, res) => {
  const profile = req.body;

  const plan = await callClaude(`
You are a professional Indian dietician and fitness coach.

Create a COMPLETE 7-day weekly fitness plan.

User Profile:
${JSON.stringify(profile)}

Rules:
- Respect diet preference (veg / non-veg)
- Consider age, gender, weight, and goal
- Keep it realistic for Indian lifestyle

For EACH DAY provide:

DAY 1:
- Breakfast
- Lunch
- Dinner
- Workout (home/gym)
- Tips

Repeat for DAY 1 to DAY 7

Format cleanly and clearly.
`);

  res.json({ plan });
});

// 📊 SIMPLE MEMORY STORE
let history = [];

// ✅ CHECK-IN
app.post("/checkin", (req, res) => {
  history.push(req.body);
  res.json({ message: "Saved" });
});

// 📈 PROGRESS
app.get("/progress", (req, res) => {
  res.json(history);
});

// 🚀 START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 FitPilot running on http://localhost:${PORT}`);
});