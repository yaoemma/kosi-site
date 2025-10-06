// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

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

// Array of all gallery images
const galleryImages = [
    'images/gallery/WhatsApp Image 2025-09-30 à 23.40.12_8c6b621a.jpg',
    'images/gallery/WhatsApp Image 2025-09-30 à 23.40.13_117752ed.jpg',
    'images/gallery/WhatsApp Image 2025-09-30 à 23.40.13_5aeafeb6.jpg',
    'images/gallery/WhatsApp Image 2025-09-30 à 23.44.42_ca82312a.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.26.58_664d29e7.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.00_17be6d7b.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.00_304abf84.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.00_51a2f2b7.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.01_4d9b1410.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.01_57eebf53.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.01_e4a0a928.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.02_93657aa9.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.02_953b3eff.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.02_e7f690c5.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.02_f8eb515b.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.03_4e2257b9.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.03_6e104a13.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.03_6fe50b05.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.04_5e59da8e.jpg',
    'images/gallery/WhatsApp Image 2025-10-01 à 00.27.04_8fc2e9a1.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.34_aea232c3.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.35_48af720c.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.35_58377018.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.35_90244f78.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.36_c7edb1ca.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.38_6209369b.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.38_ca826b02.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.39_2a729887.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.39_e54fa16f.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.40_cbb1bcd0.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.41_43ad1dc7.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.41_87d8cf5b.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.42_a2de4ec2.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.43_372db963.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.43_f91715de.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.46_449b40b5.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.47_fbd33e88.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.48_9e7333e9.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.48_9fafcb34.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.49_ac337d19.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.49_dcdc65a4.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.50_69d7ea0c.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.50_cd545b25.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.50_d253ae76.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.51_23be45ea.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.51_cb545b4c.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.52_01f1b881.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.52_0c163f3d.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.52_61336aa5.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.54_6380f548.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.54_db56d44f.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.54_eefb38ba.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.54_ff20cd23.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.55_c21a3186.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.56_15097fdd.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.56_c0715cb8.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.56_f3f6ec5d.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.57_09b54b60.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.57_b7a43a01.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.58_3953cd0f.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.58_3d59095a.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.58_dbc1683e.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.59_4905e5b2.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.59_5f9c2060.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.29.59_8ceb254b.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.00_5d583f52.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.00_abb48032.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.00_bc2a69e9.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.01_01f73128.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.01_17aae016.jpg',
    'images/gallery/WhatsApp Image 2025-10-04 à 21.30.01_94e4187e.jpg',
    'images/gallery/WhatsApp Image 2025-10-06 à 08.50.49_b04bd894.jpg',
    'images/gallery/WhatsApp Image 2025-10-06 à 08.50.50_8c089f29.jpg',
    'images/gallery/WhatsApp Image 2025-10-06 à 08.50.50_9bb58c3c.jpg',
    'images/gallery/WhatsApp Image 2025-10-06 à 08.51.36_b7bb18f1.jpg'
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
