// document.addEventListener("DOMContentLoaded", function() {
//     var chatbotIcon = document.getElementById("chatbotIcon");
//     var chatbotFrame = document.getElementById("chatbotFrame");

//     // Toggle chatbot frame on icon click
//     chatbotIcon.addEventListener("click", function() {
//         chatbotFrame.style.display = chatbotFrame.style.display === "none" || chatbotFrame.style.display === "" ? "block" : "none";
//     });
// });

// // Function to show content in the chatbot frame
// function showContent(contentId) {
//     const contentSection = document.getElementById("contentSection");

//     if (contentId === 'nearHospitals') {
//         contentSection.innerHTML = `
//             <h3>Find Nearby Hospitals</h3>
//             <p>Enter your pincode:</p>
//             <input type="text" id="pincodeInput" placeholder="Enter Pincode">
//             <button onclick="getNearbyHospitals()">Search Hospitals</button>
//             <div id="map"></div>
//             <div id="hospitalResults"></div>
//         `;
//     } else {
//         let content = '';
//         switch (contentId) {
//             case "pageInfo":
//                 content = "<h3>Page Info</h3><p>This page provides information on medical services, nearby hospitals, and more.</p>";
//                 break;
//             case "contact":
//                 content = "<h3>Contact</h3><p>Email: medicoplusin@gmail.com<br>Phone: +91-9703589296</p>";
//                 break;
//             case "imageProcessing":
//                 content = "<h3>Image Processing</h3><p>Upload an image for processing.</p>";
//                 break;
//             default:
//                 content = "<p>Welcome to the chatbot!</p>";
//         }
//         contentSection.innerHTML = content;
//     }
// }

// // Function to find nearby hospitals using OpenStreetMap and Leaflet.js
// function getNearbyHospitals() {
//     const pincode = document.getElementById('pincodeInput').value;
//     if (!pincode) {
//         alert('Please enter a valid pincode.');
//         return;
//     }

//     // Use a free geocoding API to convert the pincode to coordinates (like OpenCageData or Nominatim)
//     fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.length > 0) {
//                 const { lat, lon } = data[0];

//                 // Initialize the map with the fetched coordinates
//                 const map = L.map('map').setView([lat, lon], 14);

//                 // Add OpenStreetMap tile layer
//                 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                     attribution: '&copy; OpenStreetMap contributors'
//                 }).addTo(map);

//                 // Use Overpass API to search for hospitals
//                 fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:5000,${lat},${lon});out;`)
//                     .then(response => response.json())
//                     .then(data => displayHospitals(data.elements, map));
//             } else {
//                 alert('No results found for this pincode.');
//             }
//         });
// }

// // Function to display hospital results on the map and in the results div
// function displayHospitals(hospitals, map) {
//     const resultsDiv = document.getElementById('hospitalResults');
//     resultsDiv.innerHTML = '<h4>Hospitals Found:</h4><ul>';

//     hospitals.forEach(hospital => {
//         resultsDiv.innerHTML += `<li>${hospital.tags.name || 'Unknown Hospital'} - Lat: ${hospital.lat}, Lon: ${hospital.lon}</li>`;

//         // Add markers to the map for each hospital
//         L.marker([hospital.lat, hospital.lon])
//             .addTo(map)
//             .bindPopup(hospital.tags.name || 'Unknown Hospital')
//             .openPopup();
//     });

//     resultsDiv.innerHTML += '</ul>';
// }

// // Function to send a message
// function sendMessage() {
//     const userInput = document.getElementById("userInput");
//     const message = userInput.value.trim();
    
//     if (message) {
//         const chatContainer = document.getElementById("contentSection");
//         chatContainer.innerHTML += `<p>You: ${message}</p>`;
//         userInput.value = ''; // Clear input
//         chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
//     }
// }

// Chatbot UI and Frame Toggle Functionality
document.addEventListener("DOMContentLoaded", function() {
    var chatbotIcon = document.getElementById("chatbotIcon");
    var chatbotFrame = document.getElementById("chatbotFrame");

    // Toggle chatbot frame on icon click
    chatbotIcon.addEventListener("click", function() {
        chatbotFrame.style.display = chatbotFrame.style.display === "none" || chatbotFrame.style.display === "" ? "block" : "none";
    });
});

// Function to show content in the chatbot frame
function showContent(contentId) {
    const contentSection = document.getElementById("contentSection");

    if (contentId === 'nearHospitals') {
        contentSection.innerHTML = `
            <h3>Find Nearby Hospitals</h3>
            <p>Enter your pincode:</p>
            <input type="text" id="pincodeInput" placeholder="Enter Pincode">
            <button onclick="getNearbyHospitals()">Search Hospitals</button>
            <div id="map" style="height: 300px; margin-top: 10px;"></div>
            <div id="hospitalResults" style="margin-top: 10px;"></div>
        `;
    } else {
        let content = '';
        switch (contentId) {
            case "pageInfo":
                content = "<h3>Page Info</h3><p>This page provides information on medical services, nearby hospitals, and more.</p>";
                break;
            case "contact":
                content = "<h3>Contact</h3><p>Email: medicoplusin@gmail.com<br>Phone: +91-9703589296</p>";
                break;
            case "imageProcessing":
                content = "<h3>Image Processing</h3><p>Upload an image for processing.</p>";
                break;
            default:
                content = "<p>Welcome to the chatbot!</p>";
        }
        contentSection.innerHTML = content;
    }
}

// Function to find nearby hospitals using OpenStreetMap and Leaflet.js
function getNearbyHospitals() {
    const pincode = document.getElementById('pincodeInput').value;
    if (!pincode) {
        alert('Please enter a valid pincode.');
        return;
    }

    // Use a free geocoding API to convert the pincode to coordinates (like OpenCageData or Nominatim)
    fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];

                // Initialize the map with the fetched coordinates
                const map = L.map('map').setView([lat, lon], 14);

                // Add OpenStreetMap tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);

                // Use Overpass API to search for hospitals within 5km radius
                fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:5000,${lat},${lon});out;`)
                    .then(response => response.json())
                    .then(data => displayHospitals(data.elements, map));
            } else {
                alert('No results found for this pincode.');
            }
        })
        .catch(() => alert('Error fetching location data. Please try again.'));
}

// Function to display hospital results on the map and in the results div
function displayHospitals(hospitals, map) {
    const resultsDiv = document.getElementById('hospitalResults');
    if (!hospitals.length) {
        resultsDiv.innerHTML = "<p>No hospitals found nearby.</p>";
        return;
    }
    resultsDiv.innerHTML = '<h4>Hospitals Found:</h4><ul>';

    hospitals.forEach(hospital => {
        resultsDiv.innerHTML += `<li>${hospital.tags.name || 'Unknown Hospital'} - Lat: ${hospital.lat.toFixed(4)}, Lon: ${hospital.lon.toFixed(4)}</li>`;

        // Add markers to the map for each hospital
        L.marker([hospital.lat, hospital.lon])
            .addTo(map)
            .bindPopup(hospital.tags.name || 'Unknown Hospital');
    });

    resultsDiv.innerHTML += '</ul>';
}

// Function to send a message from user input (if used outside main chatbot)
function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    
    if (message) {
        const chatContainer = document.getElementById("contentSection");
        chatContainer.innerHTML += `<p>You: ${message}</p>`;
        userInput.value = ''; // Clear input
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    }
}

// Main Chatbot Functionality with Medical Knowledge Base
(() => {
  const messagesEl = document.getElementById('messages');
  const inputEl = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const formEl = document.getElementById('input-area');
  const typingIndicator = document.getElementById('typing-indicator');
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  
  // Enhanced medical knowledge base
  const medicalDatabase = {
    conditions: [
      {
        name: "Common Cold",
        keywords: ['cold', 'runny nose', 'sneezing', 'congestion', 'sore throat', 'cough'],
        symptoms: ["Runny or stuffy nose", "Sneezing", "Sore throat", "Cough", "Mild headache", "Mild body aches"],
        info: "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold. Most people recover from a common cold in 7-10 days.",
        treatment: ["Rest", "Stay hydrated", "Over-the-counter cold medicines", "Saltwater gargle for sore throat"],
        doctor: "General Physician",
        emergency: false,
        prevalence: "Very common (2-3 per year for adults)"
      },
      {
        name: "Influenza (Flu)",
        keywords: ['flu', 'influenza', 'high fever', 'chills', 'muscle aches', 'fatigue'],
        symptoms: ["Fever over 100.4°F (38°C)", "Muscle aches", "Chills and sweats", "Headache", "Dry cough", "Fatigue", "Nasal congestion"],
        info: "Influenza is a viral infection that attacks your respiratory system — your nose, throat and lungs. Unlike a common cold, the flu typically comes on suddenly and symptoms are more severe.",
        treatment: ["Antiviral medications (if caught early)", "Rest", "Fluids", "Pain relievers", "Stay home to avoid spreading"],
        doctor: "General Physician",
        emergency: false,
        prevalence: "Common (5-20% of population annually)"
      },
      {
        name: "COVID-19",
        keywords: ['covid', 'coronavirus', 'loss of taste', 'loss of smell', 'shortness breath'],
        symptoms: ["Fever or chills", "Cough", "Shortness of breath", "Fatigue", "Muscle aches", "Headache", "Loss of taste or smell", "Sore throat", "Congestion"],
        info: "COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus. Symptoms can range from mild to severe. Some people may be asymptomatic but still contagious.",
        treatment: ["Isolate immediately", "Rest", "Stay hydrated", "Over-the-counter medications for symptoms", "Seek emergency care for severe symptoms"],
        doctor: "General Physician or Infectious Disease Specialist",
        emergency: "Seek emergency care if you have trouble breathing, persistent chest pain, confusion, or bluish lips/face",
        prevalence: "Common (pandemic disease)"
      },
      {
        name: "Migraine",
        keywords: ['migraine', 'severe headache', 'throbbing pain', 'sensitivity to light', 'aura'],
        symptoms: ["Throbbing or pulsing pain (usually one side)", "Sensitivity to light/sound", "Nausea/vomiting", "Visual disturbances (aura)", "Dizziness"],
        info: "Migraines are severe headaches often accompanied by nausea, vomiting, and sensitivity to light. They can last for hours to days and can be debilitating.",
        treatment: ["Pain-relief medications", "Preventive medications", "Rest in quiet, dark room", "Hydration", "Identify and avoid triggers"],
        doctor: "Neurologist",
        emergency: "Seek immediate care if headache is sudden and severe (thunderclap headache) or accompanied by fever, stiff neck, confusion, or seizures",
        prevalence: "Common (12% of population)"
      },
      {
        name: "Urinary Tract Infection (UTI)",
        keywords: ['uti', 'urinary pain', 'burning urination', 'frequent urination', 'bladder infection'],
        symptoms: ["Strong, persistent urge to urinate", "Burning sensation when urinating", "Passing frequent, small amounts of urine", "Cloudy urine", "Strong-smelling urine", "Pelvic pain"],
        info: "A UTI is an infection in any part of your urinary system — kidneys, ureters, bladder and urethra. Most infections involve the lower urinary tract — the bladder and the urethra.",
        treatment: ["Antibiotics", "Increased fluid intake", "Avoid irritants like caffeine/alcohol", "Heating pad for discomfort"],
        doctor: "Urologist or General Physician",
        emergency: "Seek immediate care if you have fever, chills, nausea/vomiting, or back pain (signs of kidney infection)",
        prevalence: "Common (50-60% of women experience at least once)"
      },
      {
        name: "Gastroenteritis",
        keywords: ['stomach flu', 'food poisoning', 'diarrhea', 'vomiting', 'nausea', 'stomachache'],
        symptoms: ["Watery diarrhea", "Nausea/vomiting", "Stomach cramps", "Low-grade fever", "Headache/muscle aches"],
        info: "Gastroenteritis is inflammation of the stomach and intestines, often caused by viruses (norovirus, rotavirus) or bacteria (food poisoning). It leads to diarrhea and vomiting.",
        treatment: ["Stay hydrated with clear fluids", "BRAT diet (bananas, rice, applesauce, toast)", "Avoid dairy, fatty foods", "Oral rehydration solutions"],
        doctor: "General Physician or Gastroenterologist",
        emergency: "Seek care if symptoms last >48 hours, high fever, bloody stools, or signs of dehydration (dry mouth, dizziness, little urine)",
        prevalence: "Common (most people experience 1-2 episodes per year)"
      },
      {
        name: "Hypertension (High Blood Pressure)",
        keywords: ['high blood pressure', 'hypertension', 'bp', 'headache', 'dizziness'],
        symptoms: ["Often no symptoms (silent condition)", "Severe headaches", "Nosebleeds", "Shortness of breath", "Flushing", "Dizziness"],
        info: "Hypertension is when blood pressure is consistently too high. It damages blood vessels and can lead to heart disease, stroke, and kidney problems if untreated.",
        treatment: ["Lifestyle changes (diet, exercise, weight loss)", "Medications (ACE inhibitors, diuretics, etc.)", "Reduce sodium intake", "Limit alcohol", "Stress management"],
        doctor: "Cardiologist or General Physician",
        emergency: "Seek emergency care if blood pressure >180/120 with symptoms (severe headache, chest pain, vision changes) - may be hypertensive crisis",
        prevalence: "Common (30-45% of adults)"
      },
      {
        name: "Type 2 Diabetes",
        keywords: ['diabetes', 'high blood sugar', 'thirst', 'frequent urination', 'fatigue'],
        symptoms: ["Increased thirst", "Frequent urination", "Increased hunger", "Fatigue", "Blurred vision", "Slow-healing sores", "Frequent infections"],
        info: "Type 2 diabetes affects how your body processes blood sugar (glucose). With type 2 diabetes, your body either resists insulin or doesn't produce enough.",
        treatment: ["Healthy diet", "Regular exercise", "Blood sugar monitoring", "Oral medications", "Insulin therapy (sometimes)", "Weight loss"],
        doctor: "Endocrinologist",
        emergency: "Seek emergency care for symptoms of diabetic ketoacidosis (fruity breath, nausea, confusion) or very high/low blood sugar",
        prevalence: "Common (8-10% of population)"
      },
      {
        name: "Anxiety Disorder",
        keywords: ['anxiety', 'panic attack', 'worry', 'nervous', 'stress', 'fear'],
        symptoms: ["Excessive worry", "Restlessness", "Difficulty concentrating", "Irritability", "Muscle tension", "Sleep problems", "Panic attacks"],
        info: "Anxiety disorders involve more than temporary worry or fear. For people with an anxiety disorder, the anxiety doesn't go away and can worsen over time.",
        treatment: ["Psychotherapy (CBT)", "Medications (SSRIs, SNRIs)", "Relaxation techniques", "Regular exercise", "Avoid caffeine/alcohol", "Support groups"],
        doctor: "Psychiatrist or Psychologist",
        emergency: "If experiencing suicidal thoughts, seek help immediately",
        prevalence: "Common (19% of adults)"
      },
      {
        name: "Asthma",
        keywords: ['asthma', 'wheezing', 'shortness breath', 'chest tightness', 'coughing'],
        symptoms: ["Shortness of breath", "Chest tightness/pain", "Wheezing", "Coughing (especially at night)", "Trouble sleeping due to breathing"],
        info: "Asthma is a condition where airways narrow, swell, and produce extra mucus, making breathing difficult. It can be triggered by allergens, exercise, cold air, etc.",
        treatment: ["Inhalers (rescue and controller)", "Identify and avoid triggers", "Allergy medications", "Breathing exercises", "Action plan for attacks"],
        doctor: "Pulmonologist or Allergist",
        emergency: "Seek emergency care if symptoms worsen rapidly, rescue inhaler doesn't help, or lips/fingernails turn blue",
        prevalence: "Common (7-10% of population)"
      },
      {
        name: "Hemorrhoids (Piles)",
        keywords: ['hemorrhoids', 'piles', 'rectal bleeding', 'anal pain', 'itchy anus'],
        symptoms: ["Painless bleeding during bowel movements", "Itching or irritation in anal region", "Pain or discomfort", "Swelling around anus", "Lump near anus"],
        info: "Hemorrhoids are swollen veins in the lower rectum and anus. They can develop from straining during bowel movements, chronic constipation, or pregnancy.",
        treatment: ["High-fiber diet", "Topical treatments (creams, ointments)", "Sitz baths", "Pain relievers", "Minimizing straining"],
        doctor: "Proctologist or General Physician",
        emergency: "Seek care if bleeding is heavy or persistent",
        prevalence: "Common (50% of people by age 50)",
        severity: "Usually mild but can be chronic"
      },
      {
        name: "Acid Reflux (GERD)",
        keywords: ['heartburn', 'acid reflux', 'gerd', 'indigestion', 'chest burn'],
        symptoms: ["Burning sensation in chest (heartburn)", "Regurgitation of food/sour liquid", "Difficulty swallowing", "Chronic cough", "Lump sensation in throat"],
        info: "GERD occurs when stomach acid frequently flows back into the esophagus. This backwash can irritate the lining of your esophagus.",
        treatment: ["Antacids", "H2 blockers", "Proton pump inhibitors", "Elevating head during sleep", "Avoiding trigger foods", "Weight loss if overweight"],
        doctor: "Gastroenterologist",
        prevalence: "Common (20% of population)",
        severity: "Chronic condition requiring management"
      },
      {
        name: "Eczema (Atopic Dermatitis)",
        keywords: ['eczema', 'dermatitis', 'itchy skin', 'skin rash', 'dry skin'],
        symptoms: ["Dry, sensitive skin", "Red, inflamed skin", "Severe itching", "Dark colored patches of skin", "Scaly areas", "Oozing or crusting"],
        info: "Eczema is a condition that makes skin red and itchy. It's common in children but can occur at any age. It's chronic and tends to flare periodically.",
        treatment: ["Moisturizing creams", "Topical corticosteroids", "Oral antihistamines for itching", "Identifying and avoiding triggers", "Wet wrap therapy"],
        doctor: "Dermatologist",
        prevalence: "Common (10-20% of children, 1-3% of adults)",
        severity: "Chronic condition with flare-ups"
      },
      // Rare conditions (~1% of population)
      {
        name: "Psoriasis",
        keywords: ['psoriasis', 'scaly skin', 'skin plaques', 'silvery scales'],
        symptoms: ["Red patches of skin with thick silvery scales", "Dry, cracked skin that may bleed", "Itching, burning or soreness", "Thickened/pitted nails", "Swollen/stiff joints"],
        info: "Psoriasis is a chronic autoimmune condition that causes rapid skin cell buildup, leading to scaling on the skin's surface.",
        treatment: ["Topical corticosteroids", "Light therapy", "Systemic medications", "Biologics", "Moisturizers", "Stress reduction"],
        doctor: "Dermatologist or Rheumatologist (for psoriatic arthritis)",
        prevalence: "2-3% of population",
        severity: "Chronic condition with flare-ups"
      },
      {
        name: "Lupus (SLE)",
        keywords: ['lupus', 'butterfly rash', 'sle', 'autoimmune'],
        symptoms: ["Butterfly-shaped rash on face", "Fever", "Joint pain/stiffness", "Fatigue", "Fingers/toes turning white/blue in cold", "Shortness of breath", "Chest pain"],
        info: "Systemic lupus erythematosus is an autoimmune disease where the immune system attacks its own tissues, causing widespread inflammation.",
        treatment: ["NSAIDs", "Antimalarial drugs", "Corticosteroids", "Immunosuppressants", "Lifestyle changes (sun protection, rest)"],
        doctor: "Rheumatologist",
        prevalence: "0.1-0.2% of population",
        severity: "Serious chronic condition"
      },
      {
        name: "Multiple Sclerosis (MS)",
        keywords: ['multiple sclerosis', 'ms', 'numbness', 'balance problems', 'vision problems'],
        symptoms: ["Numbness/weakness in limbs", "Electric-shock sensations with neck movements", "Tremor/lack of coordination", "Partial/complete vision loss", "Prolonged double vision", "Slurred speech", "Fatigue", "Dizziness"],
        info: "MS is a potentially disabling disease of the brain and spinal cord where the immune system attacks the protective nerve covering.",
        treatment: ["Disease-modifying therapies", "Corticosteroids", "Plasma exchange", "Physical therapy", "Muscle relaxants"],
        doctor: "Neurologist",
        prevalence: "0.1% of population",
        severity: "Chronic, potentially disabling"
      },
      {
        name: "Crohn's Disease",
        keywords: ['crohn', 'ibd', 'abdominal pain', 'diarrhea', 'bowel inflammation'],
        symptoms: ["Diarrhea", "Abdominal pain/cramping", "Blood in stool", "Reduced appetite/weight loss", "Fatigue", "Fever", "Mouth sores"],
        info: "Crohn's disease is a type of inflammatory bowel disease causing chronic inflammation of the GI tract, often spreading deep into affected tissues.",
        treatment: ["Anti-inflammatory drugs", "Immune system suppressors", "Antibiotics", "Nutrition therapy", "Surgery (in severe cases)"],
        doctor: "Gastroenterologist",
        prevalence: "0.1-0.2% of population",
        severity: "Chronic condition with flare-ups"
      },
      {
        name: "Rheumatoid Arthritis (RA)",
        keywords: ['rheumatoid arthritis', 'ra', 'joint pain', 'morning stiffness', 'swollen joints'],
        symptoms: ["Tender, warm, swollen joints", "Joint stiffness (worse in mornings)", "Fatigue", "Fever", "Loss of appetite", "Symmetrical joint involvement"],
        info: "RA is a chronic inflammatory disorder affecting joints and other body systems. It's an autoimmune condition where the immune system attacks its own tissues.",
        treatment: ["NSAIDs", "Steroids", "Disease-modifying antirheumatic drugs", "Biologic agents", "Physical therapy"],
        doctor: "Rheumatologist",
        prevalence: "0.5-1% of population",
        severity: "Chronic, progressive condition"
      }
    ],
    emergencyConditions: [
      {
        name: "Heart Attack",
        keywords: ['heart attack', 'chest pain', 'pressure chest', 'arm pain', 'shortness breath', 'nausea'],
        symptoms: ["Chest discomfort (pressure, squeezing)", "Pain in arms, back, neck, jaw", "Shortness of breath", "Cold sweat", "Nausea", "Lightheadedness"],
        info: "A heart attack occurs when blood flow to the heart is blocked. This is a medical emergency that requires immediate treatment.",
        action: "Call emergency services immediately. Chew aspirin if available (unless allergic).",
        doctor: "Emergency Medicine (Cardiologist follow-up)"
      },
      {
        name: "Stroke",
        keywords: ['stroke', 'face drooping', 'arm weakness', 'speech difficulty', 'sudden confusion'],
        symptoms: ["Face drooping", "Arm weakness", "Speech difficulty", "Sudden confusion", "Vision problems", "Severe headache", "Dizziness/loss of balance"],
        info: "A stroke occurs when blood supply to part of the brain is interrupted. Remember FAST: Face, Arms, Speech, Time to call emergency services.",
        action: "Call emergency services immediately. Note time symptoms started.",
        doctor: "Emergency Medicine (Neurologist follow-up)"
      },
      {
        name: "Severe Allergic Reaction (Anaphylaxis)",
        keywords: ['anaphylaxis', 'allergic reaction', 'swelling', 'hives', 'difficulty breathing'],
        symptoms: ["Swelling of face/throat", "Hives", "Difficulty breathing", "Rapid pulse", "Dizziness/fainting", "Nausea/vomiting"],
        info: "Anaphylaxis is a severe, potentially life-threatening allergic reaction that requires immediate treatment with epinephrine.",
        action: "Use epinephrine auto-injector if available and call emergency services immediately.",
        doctor: "Emergency Medicine (Allergist follow-up)"
      }
    ],
    generalAdvice: [
      "Stay hydrated by drinking plenty of water",
      "Get adequate rest to help your body recover",
      "Wash your hands frequently to prevent illness spread",
      "Eat a balanced diet with fruits and vegetables",
      "Exercise regularly for overall health",
      "Manage stress through relaxation techniques",
      "Get recommended vaccinations and health screenings",
      "Avoid smoking and limit alcohol consumption"
    ],
    doctors: {
      "General Physician": "Primary care doctor for general health concerns and initial diagnosis",
      "Cardiologist": "Specializes in heart and cardiovascular system conditions",
      "Neurologist": "Specializes in brain and nervous system disorders",
      "Gastroenterologist": "Specializes in digestive system disorders",
      "Pulmonologist": "Specializes in lung and respiratory conditions",
      "Endocrinologist": "Specializes in hormone-related disorders like diabetes",
      "Dermatologist": "Specializes in skin, hair, and nail conditions",
      "Psychiatrist": "Medical doctor specializing in mental health conditions",
      "Urologist": "Specializes in urinary tract and male reproductive system",
      "Gynecologist": "Specializes in female reproductive health",
      "Orthopedic Specialist": "Specializes in bone and joint conditions",
      "Allergist/Immunologist": "Specializes in allergies and immune system disorders",
      "Proctologist": "Specializes in disorders of the rectum and anus"
    }
  };

  function createMessage(text, from = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', from === 'bot' ? 'bot' : 'user');
    msgDiv.innerHTML = text;
    messagesEl.appendChild(msgDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    typingIndicator.style.display = 'block';
  }

  function hideTyping() {
    typingIndicator.style.display = 'none';
  }

  function analyzeSymptoms(input) {
    input = input.toLowerCase();
    let matchedConditions = [];

    for (const cond of medicalDatabase.conditions) {
      let matchCount = 0;
      for (const keyword of cond.keywords) {
        if (input.includes(keyword)) matchCount++;
      }
      if (matchCount > 0) {
        matchedConditions.push({ condition: cond, matchCount });
      }
    }

    matchedConditions.sort((a, b) => b.matchCount - a.matchCount);
    return matchedConditions;
  }

  function detectEmergency(input) {
    input = input.toLowerCase();
    for (const emergency of medicalDatabase.emergencyConditions) {
      for (const keyword of emergency.keywords) {
        if (input.includes(keyword)) {
          return emergency;
        }
      }
    }
    return null;
  }

  // Respond with detailed condition info
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

    // Show top 1-2 matches
    matched.slice(0, 2).forEach(({ condition }) => {
      let response = `<strong>${condition.name}</strong><br>`;
      response += `<em>Symptoms:</em> ${condition.symptoms.join(', ')}<br>`;
      response += `<em>About:</em> ${condition.info}<br>`;
      response += `<em>Treatment:</em> ${condition.treatment.join(', ')}<br>`;
      response += `<em>Recommended Doctor:</em> ${condition.doctor}<br>`;
      if(condition.emergency) {
        response += `<span style="color:red"><strong>Emergency Warning:</strong> ${condition.emergency}</span><br>`;
      }
      response += `<em>Prevalence:</em> ${condition.prevalence || "N/A"}`;
      createMessage(response, 'bot');
    });
  }

  // Quick replies for common symptoms
  function addQuickReplies() {
    const quickReplies = [
      'I have a fever and cough',
      'I am experiencing chest pain',
      'I have a headache and nausea',
      'I feel shortness of breath',
      'I have stomach pain'
    ];

    const quickRepliesDiv = document.createElement('div');
    quickRepliesDiv.classList.add('quick-replies');

    quickReplies.forEach(text => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.className = 'quick-reply-btn';
      btn.addEventListener('click', () => {
        inputEl.value = text;
        formEl.dispatchEvent(new Event('submit'));
      });
      quickRepliesDiv.appendChild(btn);
    });

    messagesEl.appendChild(quickRepliesDiv);
  }

  // Initialize chatbot greeting and quick replies
  createMessage("Hello! I am your medical assistant. Please describe your symptoms or select one of the common symptoms below.");
  addQuickReplies();

  // Form submit handler
  formEl.addEventListener('submit', e => {
    e.preventDefault();
    const input = inputEl.value.trim();
    if (!input) return;
    
    createMessage(input, 'user');
    inputEl.value = '';
    hideTyping();
    
    // Simulate typing delay
    showTyping();
    setTimeout(() => {
      hideTyping();
      respondToSymptoms(input);
      addQuickReplies();
    }, 1500);
  });

  // Menu toggle button (if needed)
  if(menuBtn && menu){
    menuBtn.addEventListener('click', () => {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  }

})();
