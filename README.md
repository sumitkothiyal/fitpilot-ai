# 💪 FitPilot AI — Your Personal AI Fitness Coach

FitPilot AI is a full-stack, AI-powered fitness application that generates **personalized weekly diet and workout plans** based on user inputs like age, gender, weight, goal, and diet preference.

It also includes **progress tracking, streaks, and visual analytics**, making it more than just a planner — it's a behavioral fitness companion.

---

## 🚀 Live Demo

* 🌐 Frontend (Netlify): https://fitpilot-gpt.netlify.app/
* ⚙️ Backend (Render): https://fitpilot-ai.onrender.com

---

## 🧠 Features

### 🔥 AI-Powered Planning

* Generates **7-day structured fitness plans**
* Includes:

  * Breakfast, Lunch, Dinner
  * Workout plan
  * Daily tips
* Supports:

  * Vegetarian / Non-vegetarian diets
  * Fat loss / Muscle gain goals

---

### 📊 Progress Dashboard

* Track daily adherence
* View:

  * Total days
  * Consistency %
  * 🔥 Current streak
* Visualized using charts

---

### ✅ Daily Check-in System

* Mark whether you followed the plan
* Builds accountability and habits

---

### 🎯 Modern UI/UX

* Clean, responsive dashboard
* Card-based weekly plan (Zomato/HealthifyMe inspired)
* Sidebar navigation

---

## 🏗️ Tech Stack

### Frontend

* HTML5
* CSS3 (Custom UI)
* Vanilla JavaScript
* Chart.js (for analytics)

### Backend

* Node.js
* Express.js
* Anthropic Claude API (AI engine)

### Deployment

* Netlify (Frontend)
* Render (Backend)
* GitHub (Version Control)

---

## ⚙️ How It Works

1. User enters:

   * Age, Gender, Weight
   * Goal (fat loss / muscle gain)
   * Diet preference

2. Backend sends structured prompt to Claude API

3. AI returns a **7-day fitness plan**

4. Frontend renders plan as **interactive cards**

5. User logs daily progress → dashboard updates

---

## 📁 Project Structure

```
fitpilot-ai/
│
├── index.html       # Frontend UI
├── style.css        # Styling
├── app.js           # Frontend logic
├── index.js         # Backend server
├── .env             # API key (not committed)
├── _redirects       # Netlify routing
├── package.json     # Dependencies
```

---

## 🔐 Environment Variables

Create a `.env` file in root:

```
ANTHROPIC_API_KEY=your_api_key_here
```

---

## ▶️ Run Locally

### 1. Install dependencies

```
npm install
```

### 2. Start backend

```
node index.js
```

### 3. Open frontend

Open `index.html` in browser

---

## 🚀 Deployment

### Backend (Render)

* Connect GitHub repo
* Set:

  * Build: `npm install`
  * Start: `node index.js`
* Add environment variable

---

### Frontend (Netlify)

* Connect GitHub repo
* Publish directory: `.`

---

## 💡 Future Enhancements

* 🔐 User authentication (login/signup)
* 🗄️ Database (store user history)
* 📉 Weight tracking graphs
* 🤖 Adaptive AI (plans evolve based on behavior)
* 📱 Mobile-first UI / App version
* 🎯 Goal tracking & reminders

---

## 🧠 Learnings & Highlights

* Built a **full-stack AI product from scratch**
* Integrated **LLM (Claude) into real-world use case**
* Designed **agent-like workflow (input → AI → action → tracking)**
* Implemented **deployment + CI/CD pipeline**

---

## 🙌 Author

**Sumit Kothiyal**

* AI | Cloud | SAP | GenAI
* Building real-world AI products

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!

---
