// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

// ===== VISITOR TRACKING =====
// Enregistre chaque visite pour les statistiques du panneau admin
(function trackVisit() {
    const STATS_KEY = 'kosiMusic_stats';
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();
    
    // Récupérer ou initialiser les stats
    let stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {
        totalVisits: 0,
        uniqueVisitors: 0,
        firstVisit: now,
        lastVisit: now,
        dailyStats: {}
    };
    
    // Incrémenter les visites totales
    stats.totalVisits++;
    stats.lastVisit = now;
    
    // Stats quotidiennes
    if (!stats.dailyStats[today]) {
        stats.dailyStats[today] = {
            visits: 0,
            uniqueVisitors: 0
        };
    }
    stats.dailyStats[today].visits++;
    
    // Détecter un nouveau visiteur unique (simplifié)
    const visitorKey = 'kosiMusic_visitor_' + today;
    if (!sessionStorage.getItem(visitorKey)) {
        sessionStorage.setItem(visitorKey, 'true');
        stats.uniqueVisitors++;
        stats.dailyStats[today].uniqueVisitors++;
    }
    
    // Sauvegarder
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
})();

// Mobile Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Send form via WhatsApp
if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !phone || !email || !message) {
            const currentLang = localStorage.getItem('kosiMusicLang') || 'fr';
            const alertMsg = currentLang === 'fr' 
                ? 'Veuillez remplir tous les champs avant d\'envoyer.'
                : 'Please fill in all fields before sending.';
            alert(alertMsg);
            return;
        }
        
        // Format message for WhatsApp
        const whatsappMessage = `Bonjour KOSI Music!\n\n` +
            `👤 Nom: ${name}\n` +
            `📞 Téléphone: ${phone}\n` +
            `📧 Email: ${email}\n\n` +
            `💬 Message:\n${message}`;
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Optionally reset form
        const currentLang = localStorage.getItem('kosiMusicLang') || 'fr';
        const confirmMsg = currentLang === 'fr'
            ? 'WhatsApp va s\'ouvrir avec votre message. Voulez-vous réinitialiser le formulaire ?'
            : 'WhatsApp will open with your message. Do you want to reset the form?';
        
        if (confirm(confirmMsg)) {
            contactForm.reset();
        }
    });
}

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const currentLang = localStorage.getItem('kosiMusicLang') || 'fr';
    
    // Change button text
    submitBtn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
    submitBtn.disabled = true;
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Check if EmailJS is configured
    if (CONFIG.emailjs.serviceID === 'VOTRE_SERVICE_ID') {
        // EmailJS not configured - show alert
        const alertMessage = translations[currentLang]['alert_form_success']
            .replace('{name}', name)
            .replace('{email}', email);
        alert(alertMessage);
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_phone: phone,
        from_email: email,
        message: message,
        to_email: CONFIG.email
    };
    
    // Send email using EmailJS
    emailjs.send(
        CONFIG.emailjs.serviceID,
        CONFIG.emailjs.templateID,
        templateParams,
        CONFIG.emailjs.publicKey
    ).then(
        function(response) {
            console.log('SUCCESS!', response.status, response.text);
            const successMsg = currentLang === 'fr' 
                ? `Merci ${name}! Votre message a été envoyé avec succès. Nous vous répondrons à ${email} dans les plus brefs délais.`
                : `Thank you ${name}! Your message has been sent successfully. We will reply to ${email} as soon as possible.`;
            alert(successMsg);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        },
        function(error) {
            console.log('FAILED...', error);
            const errorMsg = currentLang === 'fr'
                ? 'Erreur lors de l\'envoi du message. Veuillez réessayer ou nous contacter via WhatsApp.'
                : 'Error sending message. Please try again or contact us via WhatsApp.';
            alert(errorMsg);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    );
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Lightbox functionality
let currentImageIndex = 0;
const totalImages = 75;
let isZoomed = false;

// Array of all gallery images - Organisé par catégories
const galleryImages = [
    // Guitares (0-4)
    'images/gallery/guitare.jpg.jpg',
    'images/gallery/guitare.jpg (2).jpg',
    'images/gallery/guitare.jpg (3).jpg',
    'images/gallery/guitare.jpg (4).jpg',
    'images/gallery/guitare.jpg (5).jpg',
    // Pianos (5-10)
    'images/gallery/piano.jpg.jpg',
    'images/gallery/piano.jpg (2).jpg',
    'images/gallery/piano.jpg (3).jpg',
    'images/gallery/piano.jpg (4).jpg',
    'images/gallery/piano.jpg (5).jpg',
    'images/gallery/piano.jpg (6).jpg',
    // Batteries (11-15)
    'images/gallery/batterie.jpg.jpg',
    'images/gallery/batterie.jpg (2).jpg',
    'images/gallery/batterie.jpg (3).jpg',
    'images/gallery/batterie.jpg (4).jpg',
    'images/gallery/batterie.jpg (5).jpg',
    // Microphones (16-29)
    'images/gallery/microphone.jpg.jpg',
    'images/gallery/microphone.jpg (2).jpg',
    'images/gallery/microphone.jpg (3).jpg',
    'images/gallery/microphone.jpg (4).jpg',
    'images/gallery/microphone.jpg (5).jpg',
    'images/gallery/microphone.jpg (6).jpg',
    'images/gallery/microphone.jpg (7).jpg',
    'images/gallery/microphone.jpg (8).jpg',
    'images/gallery/microphone.jpg (9).jpg',
    'images/gallery/microphone.jpg (10).jpg',
    'images/gallery/microphone.jpg (11).jpg',
    'images/gallery/microphone.jpg (12).jpg',
    'images/gallery/microphone.jpg (13).jpg',
    'images/gallery/microphone.jpg (14).jpg',
    // Saxophones (30)
    'images/gallery/saxophone.jpg.jpg',
    // Baffles (31-46)
    'images/gallery/baffle.jpg.jpg',
    'images/gallery/baffle.jpg (2).jpg',
    'images/gallery/baffle.jpg (3).jpg',
    'images/gallery/baffle.jpg (4).jpg',
    'images/gallery/baffle.jpg (5).jpg',
    'images/gallery/baffle.jpg (6).jpg',
    'images/gallery/baffle.jpg (7).jpg',
    'images/gallery/baffle.jpg (8).jpg',
    'images/gallery/baffle.jpg (9).jpg',
    'images/gallery/baffle.jpg (10).jpg',
    'images/gallery/baffle.jpg (11).jpg',
    'images/gallery/baffle.jpg (12).jpg',
    'images/gallery/baffle.jpg (13).jpg',
    'images/gallery/baffle.jpg (14).jpg',
    'images/gallery/baffle.jpg (15).jpg',
    'images/gallery/baffle.jpg (16).jpg',
    // Tables de mixage (47-55)
    'images/gallery/table-mixage.jpg.jpg',
    'images/gallery/table-mixage.jpg (2).jpg',
    'images/gallery/table-mixage.jpg (3).jpg',
    'images/gallery/table-mixage.jpg (4).jpg',
    'images/gallery/table-mixage.jpg (5).jpg',
    'images/gallery/table-mixage.jpg (6).jpg',
    'images/gallery/table-mixage.jpg (7).jpg',
    'images/gallery/table-mixage.jpg (8).jpg',
    'images/gallery/table-mixage.jpg (9).jpg',
    // Amplificateurs (56-61)
    'images/gallery/amplificateur.jpg.jpg',
    'images/gallery/amplificateur.jpg (2).jpg',
    'images/gallery/amplificateur.jpg (3).jpg',
    'images/gallery/amplificateur.jpg (4).jpg',
    'images/gallery/amplificateur.jpg (5).jpg',
    'images/gallery/amplificateur.jpg (6).jpg',
    // Tam-tams (62-64)
    'images/gallery/tam-tam.jpg.jpg',
    'images/gallery/tam-tam.jpg (2).jpg',
    'images/gallery/tam-tam.jpg (3).jpg',
    // Autres (65-74)
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.01_e4a0a928.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.55_c21a3186.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.56_f3f6ec5d.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.59_4905e5b2.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.59_8ceb254b.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.00_5d583f52.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.00_abb48032.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.00_bc2a69e9.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.01_01f73128.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.01_94e4187e.jpg'
];

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    isZoomed = false;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const currentImageSpan = document.getElementById('current-image');
    
    lightboxImage.src = galleryImages[index];
    lightboxImage.classList.remove('zoomed');
    currentImageSpan.textContent = index + 1;
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightbox.classList.remove('active');
    lightboxImage.classList.remove('zoomed');
    isZoomed = false;
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Toggle zoom
function toggleZoom() {
    const lightboxImage = document.getElementById('lightbox-image');
    isZoomed = !isZoomed;
    
    if (isZoomed) {
        lightboxImage.classList.add('zoomed');
    } else {
        lightboxImage.classList.remove('zoomed');
    }
}

// Change image in lightbox
function changeImage(direction) {
    currentImageIndex += direction;
    isZoomed = false;
    
    // Loop around
    if (currentImageIndex >= totalImages) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1;
    }
    
    const lightboxImage = document.getElementById('lightbox-image');
    const currentImageSpan = document.getElementById('current-image');
    
    lightboxImage.src = galleryImages[currentImageIndex];
    lightboxImage.classList.remove('zoomed');
    currentImageSpan.textContent = currentImageIndex + 1;
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                changeImage(-1);
                break;
            case 'ArrowRight':
                changeImage(1);
                break;
            case 'z':
            case 'Z':
                toggleZoom();
                break;
        }
    }
});

// ===== FILTRAGE DE LA GALERIE =====
// Fonction de filtrage de la galerie par catégorie
function filterGallery(category) {
    // Scroll vers la galerie
    const gallerySection = document.getElementById('galerie');
    if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Attendre que le scroll soit terminé avant de filtrer
    setTimeout(() => {
        const items = document.querySelectorAll('.gallery-image-item');
        const buttons = document.querySelectorAll('.filter-btn');
        
        // Mettre à jour les boutons actifs
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick').includes(category)) {
                btn.classList.add('active');
            }
        });
        
        // Filtrer les images
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }, 500);
}

// Rendre la fonction accessible globalement
window.filterGallery = filterGallery;
