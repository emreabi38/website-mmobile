// Mobile Navigation Toggle
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Modal functionality
const productItems = document.querySelectorAll('.product-item');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-button');

productItems.forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// Add hover effect to product cards
productItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-8px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation delay to sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Ensure all hero cards have same height
    const heroCards = document.querySelectorAll('.hero-card');
    if (heroCards.length > 0) {
        let maxHeight = 0;
        
        // Get max height of all cards
        heroCards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        
        // Apply max height to all cards
        heroCards.forEach(card => {
            card.style.height = `${maxHeight}px`;
        });
    }
});

// Hero card hover effect
document.querySelectorAll('.hero-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Legal Pages specific code
if (document.querySelector('.legal-content')) {
    // Add active state to legal links in footer
    const currentPage = window.location.pathname.split('/').pop();
    const legalLinks = document.querySelectorAll('.footer-section a');
    
    legalLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.style.color = '#FFFFFF';
            link.style.fontWeight = '600';
        }
    });
    
    // Smooth scroll for anchor links in legal pages
    document.querySelectorAll('.legal-content a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle broken images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent.classList.contains('product-item')) {
            const placeholder = document.createElement('div');
            placeholder.style.height = '200px';
            placeholder.style.backgroundColor = '#2A2A2A';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = '#666666';
            placeholder.innerHTML = 'Bild nicht verfügbar';
            parent.insertBefore(placeholder, this.nextSibling);
        }
    });
});

// Add target="_blank" to external links
document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes('http://') || href.includes('https://')) && 
        !href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});