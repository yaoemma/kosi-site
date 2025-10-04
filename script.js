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
