// Handles showing content based on the button clicked
function showContent(id) {
  document.querySelectorAll('.content-section').forEach((section) => {
    section.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// Basic chatbot functionality
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;
  appendMessage("user", message);

  // Simulated response
  const response = generateBotResponse(message);
  appendMessage("bot", response);
  input.value = "";
}

function appendMessage(sender, message) {
  const chatWindow = document.getElementById("chat-window");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);
  msgDiv.textContent = message;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function generateBotResponse(message) {
  const symptoms = message.toLowerCase();
  if (symptoms.includes("headache")) {
    return "It seems you might have a tension headache. Consider resting and staying hydrated.";
  } else if (symptoms.includes("fever")) {
    return "Monitor your temperature regularly. If the fever persists, consult a doctor.";
  } else {
    return "Thank you for the information. A medical professional will be better suited to help you further.";
  }
}

// Simulated hospital search (you can replace with real API logic)
function getNearbyHospitals() {
  const pincode = document.getElementById("pincodeInput").value.trim();
  const resultsDiv = document.getElementById("hospitalResults");
  const mapDiv = document.getElementById("map");

  if (!pincode) {
    resultsDiv.innerHTML = "Please enter a valid pincode.";
    return;
  }

  const hospitals = [
    { name: "City Hospital", lat: 12.9716, lon: 77.5946 },
    { name: "HealthCare Center", lat: 12.975, lon: 77.605 },
    { name: "MediLife Clinic", lat: 12.965, lon: 77.585 },
  ];

  resultsDiv.innerHTML = hospitals
    .map((h) => `<p><strong>${h.name}</strong></p>`) 
    .join("");

  const map = L.map("map").setView([hospitals[0].lat, hospitals[0].lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  hospitals.forEach((hospital) => {
    L.marker([hospital.lat, hospital.lon]).addTo(map)
      .bindPopup(hospital.name)
      .openPopup();
  });
}
function respondToSymptoms(input) {
  const emergency = detectEmergency(input);
  if (emergency) {
    createMessage(`<strong>Emergency detected: ${emergency.name}</strong><br>${emergency.info || ''}<br><em>${emergency.action}</em>`, 'bot');
    return;
  }

  const matched = analyzeSymptoms(input);
  if (matched.length === 0) {
    createMessage("I'm sorry, I couldn't identify the symptoms clearly. Could you please provide more details or consult a healthcare professional?", 'bot');
    return;
  }

  matched.slice(0, 2).forEach(({ condition }) => {
    let response = `<strong>${condition.name}</strong><br>`;
    response += `<em>Symptoms:</em> ${condition.symptoms.join(', ')}<br>`;
    response += `<em>About:</em> ${condition.info}<br>`;
    response += `<em>Treatment:</em> ${condition.treatment.join(', ')}<br>`;
    response += `<em>Recommended Doctor:</em> ${condition.doctor}<br>`;
    if(condition.emergency) {
      response += `<span style="color:red"><strong>Emergency Warning:</strong> ${condition.emergency}</span><br>`;
    }
    response += `<em>Prevalence:</em> ${condition.prevalence || 'N/A'}<br>`;
    createMessage(response, 'bot');
  });
}

// Event listener for form submission or button click
formEl.addEventListener('submit', e => {
  e.preventDefault();
  const input = inputEl.value.trim();
  if (!input) return;
  createMessage(input, 'user');
  inputEl.value = '';
  showTyping();

  setTimeout(() => {
    hideTyping();
    respondToSymptoms(input);
  }, 1000); // Simulate typing delay
});

// Toggle menu example
menuBtn.addEventListener('click', () => {
  menu.classList.toggle('open');
});
