// Configuration du site KOSI Music
// Modifiez ces informations selon vos besoins

const CONFIG = {
    // Votre numéro WhatsApp (format international sans + ni espaces)
    // Exemple: pour +225 07 XX XX XX XX, écrivez: 22507XXXXXXXX
    whatsappNumber: '2250575252080', // Votre numéro configuré (avec le 0)
    
    // Votre numéro de téléphone à afficher
    phoneDisplay: '+225 05 75 25 20 80', // Votre numéro configuré
    
    // Message par défaut pour WhatsApp
    whatsappMessage: 'Bonjour KOSI Music, je souhaite obtenir des informations sur vos produits.',
    
    // Adresse du magasin
    address: {
        street: 'Adjamé, Rue E14',
        city: 'Abidjan',
        country: 'Côte d\'Ivoire'
    },
    
    // Email de contact
    email: 'kosinwanze2@gmail.com',
    
    // Configuration EmailJS (à remplir après inscription)
    emailjs: {
        serviceID: 'VOTRE_SERVICE_ID',  // À remplacer
        templateID: 'VOTRE_TEMPLATE_ID', // À remplacer
        publicKey: 'VOTRE_PUBLIC_KEY'    // À remplacer
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    
    // Construire l'URL WhatsApp avec le message
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    
    // Mettre à jour tous les liens WhatsApp
    const whatsappLinks = document.querySelectorAll('#whatsapp-link, #hero-whatsapp');
    whatsappLinks.forEach(link => {
        link.href = whatsappUrl;
    });
    
    // Mettre à jour le numéro de téléphone affiché
    const phoneElement = document.getElementById('phone-number');
    if (phoneElement) {
        phoneElement.textContent = CONFIG.phoneDisplay;
    }
    
    // Mettre à jour l'email affiché
    const emailElement = document.getElementById('email-display');
    if (emailElement) {
        emailElement.textContent = CONFIG.email;
    }
});

