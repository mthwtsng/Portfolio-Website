document.addEventListener('DOMContentLoaded', function() {
    // Dynamic text animation
    const dynamicText = document.getElementById('dynamic-text');
    const professions = ['Developer', 'Student', 'Problem Solver', 'Tech Enthusiast'];
    let index = 0;
  
    function updateText() {
        dynamicText.style.opacity = 0;
        setTimeout(() => {
            index = (index + 1) % professions.length;
            dynamicText.textContent = professions[index];
            dynamicText.style.opacity = 1;
        }, 500);
    }
    setInterval(updateText, 2000);
  
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
  
    // Scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
  
    document.querySelectorAll('.card, .resume-preview, form').forEach((el) => {
        el.classList.add('hide');
        observer.observe(el);
    });
  });