const API = "https://fitpilot-ai.onrender.com";

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function generate() {
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const weight = document.getElementById("weight").value;
  const goal = document.getElementById("goal").value;
  const diet = document.getElementById("diet").value;

  const container = document.getElementById("planOutput");
  container.innerHTML = "⏳ Waking up AI... please wait";

  try {
    const res = await fetch(`${API}/plan`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ age, gender, weight, goal, diet })
    });

    const data = await res.json();
    renderPlan(data.plan);

  } catch (err) {
    container.innerHTML = "❌ Failed to fetch plan";
  }
}

function renderPlan(text) {
  const container = document.getElementById("planOutput");
  container.innerHTML = "";

  const days = text.split("DAY").filter(d => d.trim());

  days.forEach((d, i) => {
    const card = document.createElement("div");
    card.className = "plan-card";

    card.innerHTML = `
      <h3>Day ${i+1}</h3>
      <div>${d.replace(/\n/g, "<br>")}</div>
    `;

    container.appendChild(card);
  });
}

async function checkin(status) {
  await fetch(`${API}/checkin`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      date: new Date().toLocaleDateString(),
      followed: status
    })
  });

  alert("Saved!");
}

async function loadProgress() {
  const res = await fetch(`${API}/progress`);
  const data = await res.json();

  const total = data.length;
  const followed = data.filter(d => d.followed).length;

  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].followed) streak++;
    else break;
  }

  document.getElementById("stats").innerHTML = `
    <p>Total Days: ${total}</p>
    <p>Consistency: ${total ? Math.round((followed/total)*100) : 0}%</p>
    <p>🔥 Streak: ${streak}</p>
  `;

  drawChart(data);
}

function drawChart(data) {
  const ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((_, i) => `Day ${i+1}`),
      datasets: [{
        label: "Consistency",
        data: data.map(d => d.followed ? 1 : 0)
      }]
    }
  });
}