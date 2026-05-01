const API = "http://localhost:3000";

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

async function generate() {
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const weight = document.getElementById("weight").value;
  const goal = document.getElementById("goal").value;
  const diet = document.getElementById("diet").value;

  document.getElementById("planOutput").innerHTML = "⏳ Generating...";

  try {
    const res = await fetch(`${API}/plan`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ age, gender, weight, goal, diet })
    });

    const data = await res.json();

    renderPlan(data.plan);

  } catch (err) {
    document.getElementById("planOutput").innerHTML = "❌ Error loading plan";
  }
}

function renderPlan(text) {
  const container = document.getElementById("planOutput");
  container.innerHTML = "";

  const days = text.split("DAY");

  days.forEach(d => {
    if (d.trim() === "") return;

    const card = document.createElement("div");
    card.className = "plan-card";

    card.innerHTML = `<pre>${d}</pre>`;

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