// 1. Reveal Sections on Scroll
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
    if (typingElement && charIndex < typingText.length) {
        typingElement.textContent += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
    }
}
window.onload = typeEffect;

// 3. Handle Form Submission to MySQL (The "Step 4" Code)
const contactForm = document.getElementById("contactForm");
const popup = document.getElementById("statusMessage"); // Ensure this ID matches your HTML

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Getting values from the form inputs
        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        try {
            // NOTE: Check if your server.js is running on 3000 or 3001!
            const response = await fetch("http://localhost:3001/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            // Check if server returned success
            if (result.status === "success") {
                popup.classList.add("status-visible");
                contactForm.reset();
                
                // Hide the "Success" message after 4 seconds
                setTimeout(() => {
                    popup.classList.remove("status-visible");
                }, 4000);
            }
        } catch (err) {
            console.error("Connection error:", err);
            alert("Error: Is your server.js running on port 3001?");
        }
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}