// Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
cursor.style.top = e.clientY + "px";
cursor.style.left = e.clientX + "px";
});

// Typing effect
const words = ["a Creator", "a Developer", "Unique 🚀"];
let i = 0, j = 0, text = "", del = false;

function type() {
if (i < words.length) {
if (!del && j <= words[i].length) {
text = words[i].substring(0, j++);
} else if (del && j >= 0) {
text = words[i].substring(0, j--);
}

document.getElementById("typing").innerHTML = text;

if (j === words[i].length) del = true;
if (j === 0) { del = false; i++; }
} else i = 0;

setTimeout(type, 100);
}
type();

// Scroll reveal
window.addEventListener("scroll", () => {
document.querySelectorAll(".reveal").forEach(el => {
if (el.getBoundingClientRect().top < window.innerHeight - 100) {
el.classList.add("active");
}
});
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", async (e) => {
e.preventDefault();

const data = {
name: name.value,
email: email.value,
message: message.value
};

const res = await fetch("/contact", {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(data)
});

const result = await res.text();
document.getElementById("status").innerText = result;
});