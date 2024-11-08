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
            <div id="map"></div>
            <div id="hospitalResults"></div>
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

                // Use Overpass API to search for hospitals
                fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:5000,${lat},${lon});out;`)
                    .then(response => response.json())
                    .then(data => displayHospitals(data.elements, map));
            } else {
                alert('No results found for this pincode.');
            }
        });
}

// Function to display hospital results on the map and in the results div
function displayHospitals(hospitals, map) {
    const resultsDiv = document.getElementById('hospitalResults');
    resultsDiv.innerHTML = '<h4>Hospitals Found:</h4><ul>';

    hospitals.forEach(hospital => {
        resultsDiv.innerHTML += `<li>${hospital.tags.name || 'Unknown Hospital'} - Lat: ${hospital.lat}, Lon: ${hospital.lon}</li>`;

        // Add markers to the map for each hospital
        L.marker([hospital.lat, hospital.lon])
            .addTo(map)
            .bindPopup(hospital.tags.name || 'Unknown Hospital')
            .openPopup();
    });

    resultsDiv.innerHTML += '</ul>';
}

// Function to send a message
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
