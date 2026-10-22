const API = "http://localhost:5000";

// REGISTER
function register() {
  console.log("Button clicked ✅");

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  console.log("Sending data:", data);

  fetch("http://127.0.0.1:5000/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  .then(res => {
    console.log("Response received ✅");
    return res.json();
  })
  .then(data => {
    console.log("Server data:", data);
    alert(data.message);
  })
  .catch(err => {
    console.error("Error:", err);
  });
}

// LOGIN + localStorage
function login() {
  fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user)); // ✅ session save
      alert("Login Success");
      window.location = "index.html";
    } else {
      alert("Invalid login");
    }
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location = "login.html";
}

// LOAD LAWYERS + SEARCH + IMAGE + RATING + CHAT
function loadLawyers() {

  if (!localStorage.getItem("user")) {
    window.location = "login.html";
  }

  fetch(API + "/lawyers")
    .then(res => res.json())
    .then(data => {

      let search = document.getElementById("search").value.toLowerCase();
      let html = "";

      data.forEach(lawyer => {

        if (lawyer.name.toLowerCase().includes(search)) {

          html += `
          <div class="card">
            <img src="${lawyer.image}" />
            <h3>${lawyer.name}</h3>
            <p>${lawyer.type}</p>
            <p>⭐ ${lawyer.rating}</p>

            <button onclick="hire(${lawyer.id})">Hire</button>
            <button onclick="chat('${lawyer.name}')">Chat</button>
          </div>
          `;
        }

      });

      document.getElementById("list").innerHTML = html;
    });
}

// HIRE
function hire(id) {
  fetch(API + "/hire", { method: "POST" })
    .then(res => res.json())
    .then(data => alert(data.message));
}

// FAKE CHAT UI
function chat(name) {
  let msg = prompt("Chat with " + name);
  if (msg) {
    alert("Message sent: " + msg);
  }
}