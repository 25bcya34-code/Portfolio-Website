// Form Submit
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const res = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();
        document.getElementById("responseMsg").innerText = data.message;

        document.getElementById("contactForm").reset();

    } catch {
        document.getElementById("responseMsg").innerText = "Error sending message ❌";
    }
});

// Scroll Animation
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });
});