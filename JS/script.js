/* --- JS/script.js --- */
document.addEventListener('DOMContentLoaded', () => {

    // 1. THEME TOGGLE (With LocalStorage memory)
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
        });
    }

    // Load saved theme preference on page load
    if (localStorage.getItem('portfolio-theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if(themeBtn) themeBtn.textContent = '☀️';
    }

    // 2. TYPING ANIMATION (For pages with .typing-text)
    const typeTarget = document.querySelector('.typing-text');
    if (typeTarget) {
        const phrases = ["Professional Design", "Responsive Layouts", "Modern Code"];
        let i = 0, j = 0, isDeleting = false;

        function type() {
            const current = phrases[i];
            typeTarget.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);
            
            let speed = isDeleting ? 40 : 80;
            if (!isDeleting && j === current.length + 1) {
                isDeleting = true;
                speed = 2500; // Wait before deleting
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i = (i + 1) % phrases.length;
                speed = 500; // Wait before next word
            }
            setTimeout(type, speed);
        }
        type();
    }

    // 3. SCROLL REVEAL (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. ACTIVE LINK HIGHLIGHTER
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentFile) {
            link.classList.add('active');
        }
    });
});
