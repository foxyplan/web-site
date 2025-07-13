// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Analytics time selector functionality
const timeButtons = document.querySelectorAll('.time-btn');
const chartBars = document.querySelectorAll('.chart-bar');

timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        timeButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update chart data based on selected time period
        updateChart(button.textContent.toLowerCase());
    });
});

function updateChart(timePeriod) {
    const chartData = {
        week: [60, 80, 45, 90, 75, 85, 70],
        month: [65, 72, 68, 85, 78, 82, 75, 88, 70, 83, 79, 86, 72, 78, 81, 84, 76, 79, 82, 85, 77, 80, 83, 86, 78, 81, 84, 87, 79, 82],
        year: [75, 78, 82, 85, 79, 83, 87, 81, 84, 88, 82, 86]
    };
    
    const data = chartData[timePeriod] || chartData.week;
    
    // Animate chart bars
    chartBars.forEach((bar, index) => {
        if (index < data.length) {
            const height = data[index];
            bar.style.height = `${height}%`;
            bar.style.transition = 'height 0.6s ease';
        }
    });
    
    // Update chart labels
    updateChartLabels(timePeriod);
}

function updateChartLabels(timePeriod) {
    const chartLabels = document.querySelector('.chart-labels');
    let labels = [];
    
    switch(timePeriod) {
        case 'week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            break;
        case 'month':
            labels = Array.from({length: 30}, (_, i) => i + 1);
            break;
        case 'year':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            break;
    }
    
    chartLabels.innerHTML = labels.map(label => `<span>${label}</span>`).join('');
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d97706' : type === 'error' ? '#ef4444' : '#d97706'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(217, 119, 6, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .analytics-card, .stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + 
                                    (counter.textContent.includes('★') ? '★' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.replace(/^\d+/, target);
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Habit item interaction in mockup
document.querySelectorAll('.habit-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('completed');
        const checkbox = item.querySelector('.habit-checkbox');
        if (item.classList.contains('completed')) {
            checkbox.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            checkbox.innerHTML = '';
        }
    });
});

// Download buttons functionality
document.querySelectorAll('.btn').forEach(button => {
    if (button.textContent.includes('Download')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.textContent.includes('iOS') ? 'iOS' : 'Android';
            showNotification(`Download link for ${platform} will be available soon!`, 'info');
        });
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Parallax effect for hero section (desktop only)
window.addEventListener('scroll', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;
    
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for interactive elements (desktop only)
function addHoverEffects() {
    const isMobile = window.innerWidth <= 768;
    
    document.querySelectorAll('.feature-card, .stat-card, .contact-item').forEach(element => {
        if (!isMobile) {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        }
    });
}

// Initialize hover effects
addHoverEffects();

// Re-initialize on window resize
window.addEventListener('resize', () => {
    addHoverEffects();
});

// Touch-friendly interactions for mobile
document.querySelectorAll('.feature-card, .stat-card, .contact-item').forEach(element => {
    element.addEventListener('touchstart', () => {
        if (window.innerWidth <= 768) {
            element.style.transform = 'scale(0.98)';
        }
    });
    
    element.addEventListener('touchend', () => {
        if (window.innerWidth <= 768) {
            element.style.transform = 'scale(1)';
        }
    });
});

// Mobile-specific optimizations
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        document.querySelectorAll('.feature-card, .analytics-card, .stat-card').forEach(card => {
            card.style.animationDelay = '0s';
        });
        
        // Optimize touch targets
        document.querySelectorAll('.btn, .nav-link, .time-btn').forEach(element => {
            element.style.minHeight = '44px';
            element.style.minWidth = '44px';
        });
    }
}

// Initialize mobile optimizations
optimizeForMobile();

// Re-optimize on window resize
window.addEventListener('resize', () => {
    optimizeForMobile();
});

// Add viewport meta tag if not present
if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
}

console.log('Foxyplan website loaded successfully! 🦊'); 