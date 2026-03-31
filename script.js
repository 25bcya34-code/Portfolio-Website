gsap.registerPlugin(ScrollTrigger);

// 1. Cursor & 3D Profile Parallax
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3 });
    
    const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
    gsap.to(".profile-container", {
        x: xPos, y: yPos, rotationY: xPos/2, rotationX: -yPos/2, duration: 0.8
    });
});

// 2. Load Existing Images from MySQL
window.onload = async () => {
    const res = await fetch('http://localhost:3000/api/images');
    const images = await res.json();
    images.forEach(img => renderImage(img.file_path, false));
};

// 3. Handle File Upload
document.getElementById('fileElem').onchange = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    const res = await fetch('http://localhost:3000/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    renderImage(data.filePath, true);
};

function renderImage(path, isNew) {
    const div = document.createElement('div');
    div.className = 'img-card';
    div.innerHTML = `<img src="http://localhost:3000${path}">`;
    document.getElementById('gallery').prepend(div);

    if(isNew) {
        gsap.from(div, { scale: 0, rotation: 10, duration: 1, ease: "back.out(1.7)" });
    }
}

// 4. Contact Form Submission
document.getElementById('contact-form').onsubmit = async (e) => {
    e.preventDefault();
    const payload = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        message: document.getElementById('userMessage').value
    };

    const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) alert("Data successfully pushed to MySQL!");
};