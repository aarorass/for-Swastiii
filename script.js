// Floating Hearts Animation
const heartsContainer = document.getElementById('heartsContainer');
const heartSymbols = ['💕', '💗', '💖', '💝', '💘', '✨', '⭐'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 800);

// Initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingHeart, i * 300);
}

// Sparkle Effect on Mouse Move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Music Control
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        backgroundMusic.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
    isPlaying = !isPlaying;
});

// Scroll Reveal Animation
const revealSections = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Fade in effect for hero
const fadeInSection = document.querySelector('.fade-in');
setTimeout(() => {
    if (fadeInSection) {
        fadeInSection.classList.add('visible');
    }
}, 200);

// Valentine Buttons
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const valentineSection = document.querySelector('.valentine-section');
const successSection = document.getElementById('successSection');

let noBtnClickCount = 0;

yesBtn.addEventListener('click', () => {
    // Hide valentine question
    valentineSection.style.display = 'none';
    
    // Show success message
    successSection.style.display = 'block';
    successSection.classList.add('visible');
    
    // Trigger confetti
    createConfetti();
    
    // Scroll to success section
    setTimeout(() => {
        successSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
});

noBtn.addEventListener('click', (e) => {
    noBtnClickCount++;
    
    if (noBtnClickCount === 1) {
        noBtn.textContent = 'Are you sure? 🥺';
        noBtn.style.background = 'rgba(245, 175, 175, 0.3)';
    } else if (noBtnClickCount === 2) {
        noBtn.textContent = 'Please? 💔';
        yesBtn.style.transform = 'scale(1.15)';
        yesBtn.style.animation = 'heartPulse 1s infinite';
    } else if (noBtnClickCount === 3) {
        noBtn.textContent = 'Think again... 🥹';
        yesBtn.style.transform = 'scale(1.3)';
    } else {
        // Make the "No" button run away
        const randomX = Math.random() * (window.innerWidth - 200);
        const randomY = Math.random() * (window.innerHeight - 100);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.textContent = 'Catch me! 😏';
        
        // Reset after 2 seconds
        setTimeout(() => {
            noBtn.style.position = 'relative';
            noBtn.style.left = 'auto';
            noBtn.style.top = 'auto';
            noBtnClickCount = 0;
            noBtn.textContent = 'No';
            noBtn.style.background = 'rgba(255, 255, 255, 0.8)';
        }, 2000);
    }
});

// Confetti Animation
function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiColors = ['#F5AFAF', '#F9DFDF', '#FBEFEF', '#FCF8F8', '#ff69b4', '#ffc0cb'];
    const confettiPieces = [];
    const confettiCount = 150;
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.w = Math.random() * 10 + 5;
            this.h = Math.random() * 5 + 5;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.speed = Math.random() * 3 + 2;
            this.angle = Math.random() * 360;
            this.rotation = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speed;
            this.angle += this.rotation;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new Confetti());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop confetti after 8 seconds
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
    }, 8000);
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Window resize handler for confetti
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Add some extra sparkles on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(scrollTop - lastScrollTop) > 50 && Math.random() > 0.7) {
        const randomX = Math.random() * window.innerWidth;
        const randomY = scrollTop + Math.random() * window.innerHeight;
        createSparkle(randomX, randomY);
    }
    
    lastScrollTop = scrollTop;
});

// Prevent text selection on buttons for better mobile experience
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.style.webkitTouchCallout = 'none';
    button.style.webkitUserSelect = 'none';
    button.style.userSelect = 'none';
});

console.log('💕 Made with love for Swasti 💕');
