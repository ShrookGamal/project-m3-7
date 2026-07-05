const menuBtn = document.getElementById('mobile-menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

menuBtn.addEventListener('click', () => {
    mobileOverlay.classList.toggle('active');
    menuBtn.classList.toggle('open');
});
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
    });
});
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.style.padding = '5px 25px';
        header.style.background = 'rgba(255, 255, 255, 0.8)';
    } else {
        header.style.padding = '10px 30px';
        header.style.background = 'rgba(255, 255, 255, 0.15)';
    }
});
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});
const stats = document.querySelectorAll('.stat-num');
const aboutSection = document.querySelector('.about-section');
let started = false; 

function startCount(el) {
    let goal = el.dataset.val;
    let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == goal) {
            clearInterval(count);
        }
    }, 2000 / goal);
}
window.addEventListener('scroll', () => {
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top <= 400) {
        aboutSection.classList.add('active');
        
        if (!started) {
            stats.forEach((num) => startCount(num));
        }
        started = true;
    }
});