/*
 * Portfolio Website JavaScript
 * Author: Aric Hurkman
 * Description: Interactive functionality for developer portfolio website
 * Features: Smooth scrolling, animations, mobile menu, scroll effects
 */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================
    // SMOOTH SCROLLING NAVIGATION
    // ========================
    
    // Add smooth scrolling behavior to all anchor links that start with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor jump behavior
            
            // Get the target section element
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Smooth scroll to target element with offset for fixed navbar
                const offsetTop = target.offsetTop - 80; // 80px offset for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================
    // NAVBAR SCROLL EFFECTS
    // ========================
    
    // Change navbar appearance when scrolling
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY;
        
        // Add enhanced styling when scrolled past certain point
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ========================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================
    
    // Configuration for intersection observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    // Create intersection observer for fade-in animations on scroll
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate element when it comes into view
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stop observing once animated (one-time animation)
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in animation to all sections
    document.querySelectorAll('.section').forEach(section => {
        // Set initial state for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing the section
        fadeInObserver.observe(section);
    });

    // ========================
    // SKILL ITEMS STAGGERED ANIMATION
    // ========================
    
    // Create separate observer for skill items with staggered animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for each skill item
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // 150ms delay between each item
                
                // Stop observing once animated
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        skillObserver.observe(item);
    });

    // ========================
    // MOBILE MENU FUNCTIONALITY
    // ========================
    
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle mobile menu when hamburger is clicked
    mobileToggle.addEventListener('click', function() {
        // Toggle active class for menu visibility
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            // Transform to X shape
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            // Transform back to hamburger
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a navigation link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ========================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ========================
    
    // Create typewriter effect for text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect after page load
    window.addEventListener('load', function() {
        const subtitle = document.querySelector('.hero .subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            
            // Start typing effect after delay
            setTimeout(() => {
                typeWriter(subtitle, originalText, 80);
            }, 1000);
        }
    });

    // ========================
    // PARALLAX EFFECT FOR HERO
    // ========================
    
    // Add subtle parallax scrolling effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.3; // Adjust parallax speed (negative for upward movement)
        
        // Apply parallax transform only if hero is visible
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // ========================
    // BUTTON RIPPLE EFFECT
    // ========================
    
    // Add ripple effect to buttons when clicked
    document.querySelectorAll('.btn-primary, .btn-secondary, .project-link').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style the ripple element
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // ========================
    // PROJECT CARDS HOVER ENHANCEMENT
    // ========================
    
    // Add enhanced hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale and enhanced shadow on hover
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform when mouse leaves
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================
    // BACK TO TOP BUTTON
    // ========================
    
    // Create and add back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to back to top button
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
        this.style.background = 'var(--secondary-color)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.background = 'var(--primary-color)';
    });

    // ========================
    // LAZY LOADING FOR IMAGES
    // ========================
    
    // Intersection observer for lazy loading images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Replace data-src with src when image comes into view
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = function() {
                        this.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute for lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ========================
    // FORM VALIDATION UTILITIES
    // ========================
    
    // Email validation function (for future contact forms)
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation function
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // General form validation function
    function validateForm(formData) {
        const errors = [];
        
        // Check required fields
        Object.keys(formData).forEach(key => {
            if (!formData[key] || formData[key].trim() === '') {
                errors.push(`${key} is required`);
            }
        });
        
        // Validate email if present
        if (formData.email && !validateEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        return errors;
    }

    // ========================
    // KEYBOARD NAVIGATION SUPPORT
    // ========================
    
    // Add keyboard navigation support for interactive elements
    document.querySelectorAll('.btn-primary, .btn-secondary, .project-link, .social-link').forEach(element => {
        element.addEventListener('keydown', function(e) {
            // Trigger click on Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ========================
    // PERFORMANCE MONITORING
    // ========================
    
    // Monitor page performance and log metrics
    window.addEventListener('load', function() {
        // Check if Performance API is available
        if ('performance' in window) {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            // Log performance metrics to console (for development)
            console.log(`Page load time: ${loadTime}ms`);
            
            // You can send this data to analytics service in production
            // analytics.track('page_load_time', { duration: loadTime });
        }
    });

    // ========================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================
    
    // Add ARIA labels to interactive elements without explicit labels
    document.querySelectorAll('.social-link').forEach((link, index) => {
        if (!link.getAttribute('aria-label')) {
            const icon = link.querySelector('i');
            if (icon) {
                const platform = icon.className.includes('github') ? 'GitHub' :
                               icon.className.includes('linkedin') ? 'LinkedIn' :
                               icon.className.includes('twitter') ? 'Twitter' :
                               icon.className.includes('globe') ? 'Portfolio' : 'Social';
                link.setAttribute('aria-label', `Visit my ${platform} profile`);
            }
        }
    });

    // Announce page changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // ========================
    // CONSOLE WELCOME MESSAGE
    // ========================
    
    // Welcome message for fellow developers
    console.log(`
    🚀 Welcome to Aric Hurkman's Portfolio!
    
    Thanks for checking out the code. If you're interested in collaborating
    or have any questions about the implementation, feel free to reach out!
    
    Built with: HTML5, CSS3, Vanilla JavaScript
    Features: 
    - Responsive design with mobile-first approach
    - Smooth scroll animations and transitions
    - Intersection Observer API for performance
    - Accessibility focused development
    - Modern ES6+ JavaScript
    - Clean, maintainable code structure
    
    Contact: arichurkman@gmail.com
    
    Happy coding! 💻
    `);

    // ========================
    // ERROR HANDLING
    // ========================
    
    // Global error handler for unhandled JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        
        // In production, you might want to send this to an error tracking service
        // errorTracker.log(e.error);
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        
        // Prevent the default browser behavior
        e.preventDefault();
    });

}); // End of DOMContentLoaded event listener

// ========================
// UTILITY FUNCTIONS (Available globally)
// ========================

// Debounce function to limit function calls during rapid events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function to limit function calls at regular intervals
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element with offset
function scrollToElement(element, offset = 80) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}