/* --- script.js --- */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typing Animation
    const typeTarget = document.querySelector('.typing-text');
    if (typeTarget) {
        const phrases = ["E-commerce Sites", "Modern Portfolios", "Landing Pages"];
        let i = 0, j = 0, isDeleting = false;

        function type() {
            const current = phrases[i];
            typeTarget.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);
            
            if (!isDeleting && j === current.length + 1) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i = (i + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        type();
    }

    // 2. Scroll-Entry Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once it has animated in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 3. Mobile Nav Logic
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
