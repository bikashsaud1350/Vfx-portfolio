// Typing Animation
new Typed(".typing-text", {
    strings: ["Professional VFX Artist", "Digital Compositor", "Visual Effects Specialist"],
    typeSpeed: 80, backSpeed: 40, loop: true
});

// Particles Background Logic
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 60, 60, 0.3)'; ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX; this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', function(){
    canvas.width = innerWidth; canvas.height = innerHeight; init();
});

// UI Functions
function openVFX() {
    document.getElementById('folder-view').style.display = 'none';
    document.getElementById('movie-view').style.display = 'block';
    document.getElementById('proj-title').innerHTML = 'VFX <span>Projects</span>';
}

function closeVFX() {
    document.getElementById('folder-view').style.display = 'grid';
    document.getElementById('movie-view').style.display = 'none';
    document.getElementById('proj-title').innerHTML = 'Work <span>Experience</span>';
}

function playVideo(url) {
    document.getElementById('videoPlayer').src = url + "?autoplay=1";
    document.getElementById('videoOverlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    document.getElementById('videoOverlay').style.display = 'none';
    document.getElementById('videoPlayer').src = '';
    document.body.style.overflow = 'auto';
}

// ===================== SHOWREEL FUNCTIONS =====================

// Auto-play preview video on hover
const previewVid = document.getElementById('previewVid');
const showreelThumb = document.getElementById('showreelThumb');

if (showreelThumb && previewVid) {
    showreelThumb.addEventListener('mouseenter', () => {
        previewVid.play().catch(() => {});
    });
    showreelThumb.addEventListener('mouseleave', () => {
        previewVid.pause();
    });
}



// Launch main showreel inline
function launchShowreel() {
    const thumb = document.getElementById('showreelThumb');
    const player = document.getElementById('inlinePlayer');
    const video = document.getElementById('showreelVideo');

    thumb.style.display = 'none';
    player.style.display = 'block';
    video.play().catch(() => {});
}

// Close inline player and return to thumbnail
function closeInlinePlayer() {
    const thumb = document.getElementById('showreelThumb');
    const player = document.getElementById('inlinePlayer');
    const video = document.getElementById('showreelVideo');

    video.pause();
    video.currentTime = 0;
    player.style.display = 'none';
    thumb.style.display = 'block';
}

