// 1. Reveal Sections on Scroll (Fixes the blank screen issue)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// 2. Typing Effect for Hero Section
const typingText = "Cyber Security Student & Web Developer";
const typingElement = document.querySelector(".typing");
let charIndex = 0;

function typeEffect() {
    if (charIndex < typingText.length) {
        typingElement.textContent += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
    }
}
window.onload = typeEffect;

// 3. Handle Form Submission to MySQL
const contactForm = document.getElementById("contactForm");
const popup = document.getElementById("popup");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.message === "Saved ✅") {
            popup.classList.add("show");
            contactForm.reset();
            setTimeout(() => popup.classList.remove("show"), 3000);
        }
    } catch (err) {
        alert("Error: Is your server.js running?");
    }
});

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}