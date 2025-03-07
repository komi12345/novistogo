// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Navigation active selon la section visible
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Slider de témoignages
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialCards[index].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonialCards.length - 1;
            }
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= testimonialCards.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
        
        // Changer automatiquement les témoignages toutes les 5 secondes
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonialCards.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.mission-card, .project-card, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simuler l'envoi du formulaire
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }
    
    // Effet de parallaxe pour la section hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Animation pour les statistiques
    const statsItems = document.querySelectorAll('.impact-item h3');
    
    function animateStats() {
        statsItems.forEach(item => {
            const target = parseInt(item.textContent);
            let count = 0;
            const duration = 2000; // 2 secondes
            const interval = duration / target;
            
            const counter = setInterval(() => {
                count++;
                item.textContent = count;
                
                if (count >= target) {
                    clearInterval(counter);
                    item.textContent = target + (item.textContent.includes('+') ? '+' : '');
                }
            }, interval);
        });
    }
    
    // Déclencher l'animation des statistiques lorsqu'elles sont visibles
    const impactSection = document.querySelector('.impact');
    
    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(impactSection);
    }
});