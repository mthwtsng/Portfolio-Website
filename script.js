/** Initializes all components when DOM is fully loaded */
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initSmoothScrolling();
    initDynamicText();
    
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    window.scrollTo(0, 0);
});

/** Controls navbar appearance and behavior on scroll */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.padding = '1rem 0';
        }
    });
    
    window.addEventListener('scroll', setActiveNavLink);
}

/** Updates active navigation link based on current scroll position */
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/** Enables smooth scrolling behavior for anchor links */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, '', targetId);
                
                setActiveNavLink();
            }
        });
    });
}

/** Initializes fade-in animations for page elements */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    document.querySelectorAll('.project-card, .resume-item, .about-content, .contact-content').forEach(el => {
        el.classList.add('fade-in');
    });
}

/** Sets up dynamic text animation for the home subtitle */
function initDynamicText() {
    const dynamicText = document.querySelector('.home-subtitle');
    const professions = ['Full-Stack Developer', 'Software Engineer', 'Problem Solver', 'Tech Enthusiast'];
    let index = 0;

    dynamicText.innerHTML = `<span class="typewriter">Computer Science Student & Developer</span>`;

    let typewriterElement = document.querySelector('.typewriter');

    /** Types text character by character */
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            typewriterElement.innerHTML = text.substring(0, i+1) + '<span class="typing-cursor">|</span>';
            setTimeout(function() {
                typeWriter(text, i + 1, callback);
            }, 100);
        } else if (typeof callback == 'function') {
            setTimeout(callback, 2000);
        }
    }

    /** Starts the text animation cycle */
    function startTextAnimation(i) {
        if (i < professions.length) {
            typeWriter(professions[i], 0, function() {
                setTimeout(function() {
                    deleteText(professions[i].length, function() {
                        startTextAnimation((i + 1) % professions.length);
                    });
                }, 2000);
            });
        }
    }

    /** Deletes text character by character */
    function deleteText(i, callback) {
        if (i >= 0) {
            typewriterElement.innerHTML = professions[index].substring(0, i) + '<span class="typing-cursor">|</span>';
            setTimeout(function() {
                deleteText(i - 1, callback);
            }, 50);
        } else if (typeof callback == 'function') {
            index = (index + 1) % professions.length;
            setTimeout(callback, 500);
        }
    }

    setTimeout(function() {
        startTextAnimation(0);
    }, 2000);
}

/** Adds typing cursor animation styles */
const style = document.createElement('style');
style.textContent = `
    .typing-cursor {
        animation: blink 1s infinite;
        color: var(--primary);
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    .typewriter {
        color: var(--primary);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

/** Handles contact form submission and validation */
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

/** Initializes modal animations */
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            const modalContent = this.querySelector('.modal-content');
            modalContent.style.transform = 'translateY(-50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.transform = 'translateY(0)';
                modalContent.style.opacity = '1';
            }, 10);
        });
    });
});

console.log(`
    👋 Welcome to Matthew Tseng's Portfolio!
    
    Interested in the code? Check out the GitHub repository.
    Feel free to reach out if you have any questions!
    
    📧 Email: mthwtsng@gmail.com
    🔗 LinkedIn: https://www.linkedin.com/in/mthwtsng/
    💻 GitHub: https://github.com/mthwtsng
`);