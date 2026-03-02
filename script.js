// ==================== NAVIGATION ==================== //

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ==================== //

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

// ==================== ACTIVE NAV LINK ==================== //

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== FORM SUBMISSION ==================== //

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name') || document.querySelector('.contact-form input[type="text"]').value,
        email: formData.get('email') || document.querySelector('.contact-form input[type="email"]').value,
        phone: formData.get('phone') || document.querySelector('.contact-form input[type="tel"]').value,
        message: formData.get('message') || document.querySelector('.contact-form textarea').value
    };

    // Get form inputs properly
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    const formValues = {
        name: inputs[0].value,
        email: inputs[1].value,
        phone: inputs[2].value,
        message: inputs[3].value
    };

    // Validate
    if (!formValues.name || !formValues.email || !formValues.message) {
        alert('Mohon isi semua field yang diperlukan!');
        return;
    }

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '✓ Pesan Terkirim!';
    submitBtn.style.background = '#27ae60';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 3000);

    console.log('Pesan dikirim:', formValues);
});

// ==================== SCROLL ANIMATIONS ==================== //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe program cards and testimonial cards
document.querySelectorAll('.program-card, .testimonial-card, .vm-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== SUPPORT BUTTON ==================== //

document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('Terima kasih atas dukungan Anda! Silakan hubungi kami untuk informasi lebih lanjut.');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// ==================== PARALLAX EFFECT ==================== //

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0px ${scrolled * 0.5}px`;
    }
});

// ==================== NUMBER COUNTER ==================== //

const countUpElements = document.querySelectorAll('[data-count]');

const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 10);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 10);
};

// ==================== TOOLTIP ==================== //

const tooltips = document.querySelectorAll('[data-tooltip]');

tooltips.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });

    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});

// ==================== ACTIVE NAV LINK STYLING ==================== //

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #ff6b35;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZE ==================== //

console.log('Website Calon Legislatif - Script Loaded Successfully');
console.log('Selamat datang! Website Anda siap digunakan.');

// ==================== DARK MODE TOGGLE (Optional) ==================== //

// Uncomment kode di bawah jika ingin menambahkan fitur dark mode

/*
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌙';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #003366;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 999;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
*/

// ==================== RESPONSIVE IMAGE LOADING ==================== //

// Placeholder images dapat diganti dengan URL gambar asli
const images = document.querySelectorAll('img');

images.forEach(img => {
    // Jika tidak ada src, gunakan placeholder
    if (!img.src || img.src === '') {
        img.src = 'https://via.placeholder.com/400x500?text=Kandidat+Legislatif';
        img.alt = 'Foto Kandidat';
    }
});

// ==================== PRINT FUNCTIONALITY ==================== //

const printButton = document.createElement('button');
printButton.textContent = '🖨️ Cetak';
printButton.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    padding: 12px 20px;
    background: #003366;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 999;
    font-size: 0.9rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

printButton.addEventListener('mouseenter', () => {
    printButton.style.background = '#0066cc';
    printButton.style.transform = 'scale(1.05)';
});

printButton.addEventListener('mouseleave', () => {
    printButton.style.background = '#003366';
    printButton.style.transform = 'scale(1)';
});

printButton.addEventListener('click', () => {
    window.print();
});

document.body.appendChild(printButton);
