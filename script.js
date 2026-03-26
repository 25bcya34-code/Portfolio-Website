/* ================================
   🌐 CONFIGURATION
================================ */

// 👉 Change this based on where you're running your project

// Local backend (Node.js)
let API_URL = "http://localhost:3000/contact";

// For GitHub Pages (no backend), use:
// let API_URL = "";

// For deployed backend (Render/Railway), use:
// let API_URL = "https://your-backend-url/contact";


/* ================================
   📩 CONTACT FORM HANDLING
================================ */

const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get user input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // If backend is not available (GitHub Pages)
    if (!API_URL) {
        responseMsg.innerText = "✅ Message sent successfully!";
        form.reset();
        return;
    }

    try {
        // Send data to backend
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        // Show success message
        responseMsg.innerText = data.message;

        // Reset form
        form.reset();

    } catch (error) {
        // Show error message
        responseMsg.innerText = "❌ Error sending message. Try again.";
    }
});


/* ================================
   🎯 SCROLL ANIMATION
================================ */

const sections = document.querySelectorAll(".section");

function revealSections() {
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });
}

// Run on scroll
window.addEventListener("scroll", revealSections);


/* ================================
   ✨ SMOOTH NAVIGATION SCROLL
================================ */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetSection = document.querySelector(
            this.getAttribute("href")
        );

        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});