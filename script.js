// Smooth scrolling for anchor links
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

// Add scroll animation for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Add CSS animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add glow effect on mouse move
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    const glowElements = document.querySelectorAll('.hero::before');
    glowElements.forEach(el => {
        el.style.left = (x - 300) + 'px';
        el.style.top = (y - 300) + 'px';
    });
});

console.log('Nova Service website loaded successfully!');
