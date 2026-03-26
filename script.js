let API_URL = "http://localhost:3000/contact"; // change if needed

const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = name.value;
    const email = email.value;
    const message = message.value;

    if (!API_URL) {
        responseMsg.innerText = "✅ Message sent!";
        form.reset();
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();
        responseMsg.innerText = data.message;
        form.reset();

    } catch {
        responseMsg.innerText = "❌ Error sending message";
    }
});

/* Scroll Animation */
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
});