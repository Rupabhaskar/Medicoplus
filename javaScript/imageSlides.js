// //for image slides
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let slides = document.querySelectorAll('.slides');
//   slideIndex++;
//   if (slideIndex >= slides.length) {slideIndex = 0}
//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slides[slideIndex].style.display = "block";
//   setTimeout(showSlides, 10000); // Change image every number of seconds
// }

// // chatbotFrame code
// function toggleChatbotFrame() {
//   const chatbotFrame = document.getElementById("chatbot-frame");
//   chatbotFrame.style.display = chatbotFrame.style.display === "block" ? "none" : "block";
  
// }let slideIndex = 0;
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Reset slideIndex to 1 if it exceeds number of slides
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }  
    
    // Display the current slide
    slides[slideIndex - 1].style.display = "block";  
    
    // Update dots to indicate the current slide
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";
    
    // Change slide every 3 seconds
    setTimeout(showSlides, 3000);  
}

// For manual control of slides (optional)
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
