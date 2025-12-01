// Admin Panel JavaScript for BETHEL SONORISATION
// Storage keys
const STORAGE_KEYS = {
    AUTH: 'kosiAdmin_auth',
    PRODUCTS: 'kosiAdmin_products',
    GALLERY: 'kosiAdmin_gallery',
    CONTACT: 'kosiAdmin_contact',
    CREDENTIALS: 'kosiAdmin_credentials',
    STATS: 'kosiMusic_stats'
};

// Default credentials (à changer lors de la première connexion)
const DEFAULT_CREDENTIALS = {
    username: 'admin',
    password: 'kosi2025'
};

// Initialize default data
function initializeDefaultData() {
    // Initialize credentials if not exist
    if (!localStorage.getItem(STORAGE_KEYS.CREDENTIALS)) {
        localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(DEFAULT_CREDENTIALS));
    }

    // Initialize products if not exist
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        const defaultProducts = [
            {
                id: 'prod_1',
                icon: '🎸',
                nameFr: 'Guitare Électrique',
                nameEn: 'Electric Guitar',
                descFr: 'Guitare électrique professionnelle avec son exceptionnel',
                descEn: 'Professional electric guitar with exceptional sound'
            },
            {
                id: 'prod_2',
                icon: '🎹',
                nameFr: 'Piano Numérique',
                nameEn: 'Digital Piano',
                descFr: 'Piano numérique 88 touches avec effets intégrés',
                descEn: '88-key digital piano with built-in effects'
            },
            {
                id: 'prod_3',
                icon: '🥁',
                nameFr: 'Batterie Électronique',
                nameEn: 'Electronic Drums',
                descFr: 'Batterie électronique complète avec pads sensibles',
                descEn: 'Complete electronic drum kit with sensitive pads'
            },
            {
                id: 'prod_4',
                icon: '🎤',
                nameFr: 'Microphone Studio',
                nameEn: 'Studio Microphone',
                descFr: 'Microphone à condensateur pour enregistrement professionnel',
                descEn: 'Condenser microphone for professional recording'
            },
            {
                id: 'prod_5',
                icon: '🎧',
                nameFr: 'Casque Audio Pro',
                nameEn: 'Pro Audio Headphones',
                descFr: 'Casque audio professionnel avec réduction de bruit',
                descEn: 'Professional audio headphones with noise cancellation'
            },
            {
                id: 'prod_6',
                icon: '🎛️',
                nameFr: 'Table de Mixage',
                nameEn: 'Mixing Console',
                descFr: 'Table de mixage professionnelle multi-canaux',
                descEn: 'Professional multi-channel mixing console'
            },
            {
                id: 'prod_8',
                icon: '🎷',
                nameFr: 'Saxophone Alto',
                nameEn: 'Alto Saxophone',
                descFr: 'Saxophone alto professionnel en laiton',
                descEn: 'Professional brass alto saxophone'
            },
            {
                id: 'prod_9',
                icon: '🔊',
                nameFr: 'Baffle',
                nameEn: 'Speaker Cabinet',
                descFr: 'Baffle professionnel haute puissance',
                descEn: 'Professional high-power speaker cabinet'
            },
            {
                id: 'prod_10',
                icon: '🔌',
                nameFr: 'Amplificateur',
                nameEn: 'Amplifier',
                descFr: 'Amplificateur puissant pour instruments',
                descEn: 'Powerful amplifier for instruments'
            },
            {
                id: 'prod_11',
                icon: '🪘',
                nameFr: 'Tam-tam',
                nameEn: 'Tam-tam',
                descFr: 'Tam-tam traditionnel de qualité professionnelle',
                descEn: 'Traditional professional quality tam-tam'
            }
        ];
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
    }

    // Initialize contact info if not exist
    if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
        const defaultContact = {
            whatsappNumber: '2250575252080',
            phoneDisplay: '+225 05 75 25 20 80',
            email: 'kosinwanze2@gmail.com',
            whatsappMessage: 'Bonjour BETHEL SONORISATION, je souhaite obtenir des informations sur vos produits.',
            facebookLink: 'https://www.facebook.com/share/1QrKBQMgeU/',
            tiktokLink: 'https://www.tiktok.com/@austinmusic225?_t=ZM-90JrIYrkcqy&_r=1'
        };
        localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(defaultContact));
    }
}

// Authentication functions
function checkAuth() {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
}

function login(username, password) {
    const credentials = JSON.parse(localStorage.getItem(STORAGE_KEYS.CREDENTIALS));
    if (username === credentials.username && password === credentials.password) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    location.reload();
}

// Notification system
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    toast.textContent = message;
    toast.className = `notification-toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Products Management
function loadProducts() {
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'item-card';
        productCard.innerHTML = `
            <div class="item-icon">${product.icon}</div>
            <h3>${product.nameFr}</h3>
            <p>${product.descFr}</p>
            <div class="item-actions">
                <button class="btn btn-primary btn-small" onclick="editProduct('${product.id}')">✏️ Modifier</button>
                <button class="btn btn-danger btn-small" onclick="deleteProduct('${product.id}')">🗑️ Supprimer</button>
            </div>
        `;
        productsList.appendChild(productCard);
    });
}

function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('product-form');
    
    if (productId) {
        modalTitle.textContent = 'Modifier le produit';
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-icon').value = product.icon;
            document.getElementById('product-name-fr').value = product.nameFr;
            document.getElementById('product-name-en').value = product.nameEn;
            document.getElementById('product-desc-fr').value = product.descFr;
            document.getElementById('product-desc-en').value = product.descEn;
        }
    } else {
        modalTitle.textContent = 'Ajouter un produit';
        form.reset();
        document.getElementById('product-id').value = '';
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('active');
}

function editProduct(productId) {
    openProductModal(productId);
}

function deleteProduct(productId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        let products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS));
        products = products.filter(p => p.id !== productId);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        loadProducts();
        showNotification('Produit supprimé avec succès', 'success');
    }
}

function saveProduct(formData) {
    let products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS));
    const productId = formData.get('id');
    
    const product = {
        id: productId || 'prod_' + Date.now(),
        icon: formData.get('icon'),
        nameFr: formData.get('nameFr'),
        nameEn: formData.get('nameEn'),
        descFr: formData.get('descFr'),
        descEn: formData.get('descEn')
    };
    
    if (productId) {
        // Update existing product
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = product;
        }
    } else {
        // Add new product
        products.push(product);
    }
    
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    closeProductModal();
    loadProducts();
    showNotification('Produit enregistré avec succès', 'success');
}

// Gallery Management - Nouvelle version pour gérer les images du site
let galleryImagesData = [];

// Liste complète des images actuelles du site
const SITE_IMAGES = {
    guitare: [
        'images/gallery/guitare.jpg.jpg',
        'images/gallery/guitare.jpg (2).jpg',
        'images/gallery/guitare.jpg (3).jpg',
        'images/gallery/guitare.jpg (4).jpg',
        'images/gallery/guitare.jpg (5).jpg'
    ],
    piano: [
        'images/gallery/piano.jpg.jpg',
        'images/gallery/piano.jpg (2).jpg',
        'images/gallery/piano.jpg (3).jpg',
        'images/gallery/piano.jpg (4).jpg',
        'images/gallery/piano.jpg (5).jpg',
        'images/gallery/piano.jpg (6).jpg'
    ],
    batterie: [
        'images/gallery/batterie.jpg.jpg',
        'images/gallery/batterie.jpg (2).jpg',
        'images/gallery/batterie.jpg (3).jpg',
        'images/gallery/batterie.jpg (4).jpg',
        'images/gallery/batterie.jpg (5).jpg'
    ],
    microphone: [
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
        'images/gallery/microphone.jpg (14).jpg'
    ],
    saxophone: ['images/gallery/saxophone.jpg.jpg'],
    baffle: [
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
        'images/gallery/baffle.jpg (16).jpg'
    ],
    mixage: [
        'images/gallery/table-mixage.jpg.jpg',
        'images/gallery/table-mixage.jpg (2).jpg',
        'images/gallery/table-mixage.jpg (3).jpg',
        'images/gallery/table-mixage.jpg (4).jpg',
        'images/gallery/table-mixage.jpg (5).jpg',
        'images/gallery/table-mixage.jpg (6).jpg',
        'images/gallery/table-mixage.jpg (7).jpg',
        'images/gallery/table-mixage.jpg (8).jpg',
        'images/gallery/table-mixage.jpg (9).jpg'
    ],
    amplificateur: [
        'images/gallery/amplificateur.jpg.jpg',
        'images/gallery/amplificateur.jpg (2).jpg',
        'images/gallery/amplificateur.jpg (3).jpg',
        'images/gallery/amplificateur.jpg (4).jpg',
        'images/gallery/amplificateur.jpg (5).jpg',
        'images/gallery/amplificateur.jpg (6).jpg'
    ],
    tamtam: [
        'images/gallery/tam-tam.jpg.jpg',
        'images/gallery/tam-tam.jpg (2).jpg',
        'images/gallery/tam-tam.jpg (3).jpg'
    ],
    all: [
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
    ]
};

function scanGallery() {
    galleryImagesData = [];
    let index = 0;
    
    // Construire la liste complète avec catégories
    Object.keys(SITE_IMAGES).forEach(category => {
        SITE_IMAGES[category].forEach(imagePath => {
            galleryImagesData.push({
                index: index++,
                path: imagePath,
                category: category,
                name: imagePath.split('/').pop()
            });
        });
    });
    
    // Sauvegarder dans localStorage
    localStorage.setItem('kosiAdmin_galleryData', JSON.stringify(galleryImagesData));
    
    // Afficher les images
    displayGalleryManager();
    
    // Mettre à jour le compteur
    document.getElementById('total-images-count').textContent = galleryImagesData.length;
    
    showNotification(`${galleryImagesData.length} images scannées avec succès!`, 'success');
}

function displayGalleryManager() {
    const manager = document.getElementById('gallery-manager');
    manager.innerHTML = '<div class="gallery-manager-grid"></div>';
    const grid = manager.querySelector('.gallery-manager-grid');
    
    galleryImagesData.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-manager-item';
        item.innerHTML = `
            <div style="position: relative;">
                <img src="${img.path}" alt="${img.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22><rect fill=%22%23333%22 width=%22200%22 height=%22150%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22>Image</text></svg>'">
                <button class="image-delete-btn" onclick="deleteImageFromGallery(${index})" title="Supprimer">🗑️</button>
            </div>
            <div class="image-name" title="${img.name}">${img.name}</div>
            <select onchange="updateImageCategory(${index}, this.value)">
                <option value="all" ${img.category === 'all' ? 'selected' : ''}>Tous / Autres</option>
                <option value="guitare" ${img.category === 'guitare' ? 'selected' : ''}>🎸 Guitare</option>
                <option value="piano" ${img.category === 'piano' ? 'selected' : ''}>🎹 Piano</option>
                <option value="batterie" ${img.category === 'batterie' ? 'selected' : ''}>🥁 Batterie</option>
                <option value="microphone" ${img.category === 'microphone' ? 'selected' : ''}>🎤 Microphone</option>
                <option value="casque" ${img.category === 'casque' ? 'selected' : ''}>🎧 Casque</option>
                <option value="saxophone" ${img.category === 'saxophone' ? 'selected' : ''}>🎷 Saxophone</option>
                <option value="baffle" ${img.category === 'baffle' ? 'selected' : ''}>📢 Baffle</option>
                <option value="mixage" ${img.category === 'mixage' ? 'selected' : ''}>🎚️ Table Mixage</option>
                <option value="amplificateur" ${img.category === 'amplificateur' ? 'selected' : ''}>📻 Amplificateur</option>
                <option value="tamtam" ${img.category === 'tamtam' ? 'selected' : ''}>🪘 Tam-tam</option>
            </select>
        `;
        grid.appendChild(item);
    });
}

function deleteImageFromGallery(index) {
    if (confirm('Êtes-vous sûr de vouloir retirer cette image de la galerie ?')) {
        galleryImagesData.splice(index, 1);
        
        // Réindexer
        galleryImagesData.forEach((img, i) => {
            img.index = i;
        });
        
        localStorage.setItem('kosiAdmin_galleryData', JSON.stringify(galleryImagesData));
        displayGalleryManager();
        document.getElementById('total-images-count').textContent = galleryImagesData.length;
        showNotification('Image retirée. Générez le nouveau code pour mettre à jour le site.', 'success');
    }
}

function updateImageCategory(index, newCategory) {
    galleryImagesData[index].category = newCategory;
    localStorage.setItem('kosiAdmin_galleryData', JSON.stringify(galleryImagesData));
    showNotification('Catégorie mise à jour', 'success');
}

function addNewImages(files) {
    if (galleryImagesData.length === 0) {
        showNotification('Veuillez d\'abord scanner le dossier gallery', 'error');
        return;
    }
    
    let addedCount = 0;
    const totalFiles = files.length;
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newIndex = galleryImagesData.length;
                galleryImagesData.push({
                    index: newIndex,
                    path: e.target.result,
                    category: 'all',
                    name: file.name,
                    isNew: true
                });
                addedCount++;
                
                if (addedCount === totalFiles) {
                    localStorage.setItem('kosiAdmin_galleryData', JSON.stringify(galleryImagesData));
                    displayGalleryManager();
                    document.getElementById('total-images-count').textContent = galleryImagesData.length;
                    showNotification(`${addedCount} image(s) ajoutée(s). Assignez des catégories puis générez le code.`, 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

function generateCode() {
    if (galleryImagesData.length === 0) {
        showNotification('Veuillez d\'abord scanner le dossier gallery', 'error');
        return;
    }
    
    // Générer le HTML
    let htmlCode = '';
    let jsCode = 'const galleryImages = [\n';
    let currentIndex = 0;
    
    // Grouper par catégorie
    const categories = ['guitare', 'piano', 'batterie', 'microphone', 'saxophone', 'baffle', 'mixage', 'amplificateur', 'tamtam', 'all'];
    const categoryLabels = {
        guitare: 'GUITARES',
        piano: 'PIANOS',
        batterie: 'BATTERIES',
        microphone: 'MICROPHONES',
        saxophone: 'SAXOPHONES',
        baffle: 'BAFFLES',
        mixage: 'TABLES DE MIXAGE',
        amplificateur: 'AMPLIFICATEURS',
        tamtam: 'TAM-TAMS',
        all: 'AUTRES INSTRUMENTS'
    };
    
    categories.forEach(cat => {
        const imagesInCategory = galleryImagesData.filter(img => img.category === cat);
        
        if (imagesInCategory.length > 0) {
            htmlCode += `                <!-- ${categoryLabels[cat]} (${imagesInCategory.length} images) -->\n`;
            jsCode += `    // ${categoryLabels[cat]} (${currentIndex}-${currentIndex + imagesInCategory.length - 1})\n`;
            
            imagesInCategory.forEach(img => {
                const altText = categoryLabels[cat].charAt(0) + categoryLabels[cat].slice(1).toLowerCase().replace('s', '');
                htmlCode += `                <div class="gallery-image-item" data-category="${img.category}" onclick="openLightbox(${currentIndex})">\n`;
                htmlCode += `                    <img src="${img.path}" alt="${altText}">\n`;
                htmlCode += `                </div>\n`;
                
                jsCode += `    '${img.path}',\n`;
                currentIndex++;
            });
            
            htmlCode += '\n';
        }
    });
    
    jsCode = jsCode.slice(0, -2) + '\n];'; // Enlever la dernière virgule
    
    // Afficher dans le modal
    document.getElementById('generated-html').value = htmlCode;
    document.getElementById('generated-js').value = jsCode;
    document.getElementById('code-modal').classList.add('active');
}

function copyToClipboard(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand('copy');
    showNotification('Code copié dans le presse-papiers!', 'success');
}

function loadGallery() {
    // Charger les données sauvegardées
    const savedData = localStorage.getItem('kosiAdmin_galleryData');
    if (savedData) {
        galleryImagesData = JSON.parse(savedData);
        displayGalleryManager();
        document.getElementById('total-images-count').textContent = galleryImagesData.length;
    }
}


// Contact Management
function loadContactInfo() {
    const contact = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT));
    if (contact) {
        document.getElementById('whatsapp-number').value = contact.whatsappNumber;
        document.getElementById('phone-display').value = contact.phoneDisplay;
        document.getElementById('email-address').value = contact.email;
        document.getElementById('whatsapp-message').value = contact.whatsappMessage;
        document.getElementById('facebook-link').value = contact.facebookLink;
        document.getElementById('tiktok-link').value = contact.tiktokLink;
    }
}

function saveContactInfo() {
    const contact = {
        whatsappNumber: document.getElementById('whatsapp-number').value,
        phoneDisplay: document.getElementById('phone-display').value,
        email: document.getElementById('email-address').value,
        whatsappMessage: document.getElementById('whatsapp-message').value,
        facebookLink: document.getElementById('facebook-link').value,
        tiktokLink: document.getElementById('tiktok-link').value
    };
    
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
    showNotification('Informations de contact enregistrées avec succès', 'success');
}

// Settings Management
function changePassword(currentPassword, newPassword, confirmPassword) {
    try {
        const credentialsStr = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
        
        if (!credentialsStr) {
            showNotification('Erreur: Identifiants non trouvés. Réinitialisez les données.', 'error');
            return false;
        }
        
        const credentials = JSON.parse(credentialsStr);
        
        if (currentPassword !== credentials.password) {
            showNotification('Le mot de passe actuel est incorrect', 'error');
            return false;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('Les nouveaux mots de passe ne correspondent pas', 'error');
            return false;
        }
        
        if (newPassword.length < 6) {
            showNotification('Le nouveau mot de passe doit contenir au moins 6 caractères', 'error');
            return false;
        }
        
        // Mettre à jour le mot de passe
        credentials.password = newPassword;
        localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
        
        // Vérifier que la sauvegarde a réussi
        const savedCreds = JSON.parse(localStorage.getItem(STORAGE_KEYS.CREDENTIALS));
        if (savedCreds.password === newPassword) {
            showNotification('✅ Mot de passe changé avec succès ! Utilisez-le lors de votre prochaine connexion.', 'success');
            
            // Afficher confirmation
            setTimeout(() => {
                alert('Mot de passe changé !\n\nNouveau mot de passe : ' + newPassword + '\n\n⚠️ Notez-le dans un endroit sûr !');
            }, 500);
            
            return true;
        } else {
            showNotification('Erreur lors de la sauvegarde. Réessayez.', 'error');
            return false;
        }
    } catch (error) {
        console.error('Erreur changement de mot de passe:', error);
        showNotification('Erreur technique: ' + error.message, 'error');
        return false;
    }
}

function resetProducts() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les produits ? Cette action est irréversible.')) {
        localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
        initializeDefaultData();
        loadProducts();
        showNotification('Produits réinitialisés avec succès', 'success');
    }
}

function resetAllData() {
    if (confirm('⚠️ ATTENTION ⚠️\n\nÊtes-vous sûr de vouloir réinitialiser TOUTES les données ?\nCeci inclut les produits, la galerie et les informations de contact.\nCette action est IRRÉVERSIBLE.')) {
        if (confirm('Dernière confirmation : Voulez-vous vraiment tout réinitialiser ?')) {
            localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
            localStorage.removeItem(STORAGE_KEYS.GALLERY);
            localStorage.removeItem(STORAGE_KEYS.CONTACT);
            initializeDefaultData();
            loadProducts();
            loadGallery();
            loadContactInfo();
            showNotification('Toutes les données ont été réinitialisées', 'success');
        }
    }
}

// Export data for use in main site
function exportToMainSite() {
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
    const contact = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT)) || {};
    
    // Update config.js
    const configContent = `// Configuration du site BETHEL SONORISATION
// Ce fichier est généré automatiquement par le panneau d'administration

const CONFIG = {
    whatsappNumber: '${contact.whatsappNumber}',
    phoneDisplay: '${contact.phoneDisplay}',
    whatsappMessage: '${contact.whatsappMessage}',
    address: {
        street: 'Adjamé, Rue E14',
        city: 'Abidjan',
        country: 'Côte d\\'Ivoire'
    },
    email: '${contact.email}',
    emailjs: {
        serviceID: 'VOTRE_SERVICE_ID',
        templateID: 'VOTRE_TEMPLATE_ID',
        publicKey: 'VOTRE_PUBLIC_KEY'
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const whatsappUrl = \`https://wa.me/\${CONFIG.whatsappNumber}?text=\${encodeURIComponent(CONFIG.whatsappMessage)}\`;
    const whatsappLinks = document.querySelectorAll('#whatsapp-link, #hero-whatsapp');
    whatsappLinks.forEach(link => {
        link.href = whatsappUrl;
    });
    
    const phoneElement = document.getElementById('phone-number');
    if (phoneElement) {
        phoneElement.textContent = CONFIG.phoneDisplay;
    }
    
    const emailElement = document.getElementById('email-display');
    if (emailElement) {
        emailElement.textContent = CONFIG.email;
    }
});
`;
    
    // Create a downloadable file
    const blob = new Blob([configContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    a.click();
    
    showNotification('Fichier de configuration téléchargé. Remplacez le config.js dans votre site.', 'success');
}

// Statistics Management
function loadDashboard() {
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS)) || {
        totalVisits: 0,
        uniqueVisitors: 0,
        firstVisit: null,
        lastVisit: null,
        dailyStats: {}
    };
    
    // Total visitors
    document.getElementById('total-visitors').textContent = stats.totalVisits;
    
    // Today's stats
    const today = new Date().toISOString().split('T')[0];
    const todayStats = stats.dailyStats[today] || { visits: 0, uniqueVisitors: 0 };
    document.getElementById('today-visitors').textContent = todayStats.visits;
    document.getElementById('today-date').textContent = formatDate(today);
    
    // Week stats
    const weekStats = getWeekStats(stats.dailyStats);
    document.getElementById('week-visitors').textContent = weekStats;
    
    // Month stats
    const monthStats = getMonthStats(stats.dailyStats);
    document.getElementById('month-visitors').textContent = monthStats;
    const currentMonth = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    document.getElementById('current-month').textContent = currentMonth;
    
    // First and last visit
    if (stats.firstVisit) {
        document.getElementById('first-visit-date').textContent = formatDateTime(stats.firstVisit);
    }
    if (stats.lastVisit) {
        document.getElementById('last-visit-date').textContent = formatDateTime(stats.lastVisit);
    }
    
    // Average per day
    const daysSinceFirst = stats.firstVisit ? 
        Math.max(1, Math.ceil((new Date() - new Date(stats.firstVisit)) / (1000 * 60 * 60 * 24))) : 1;
    const avgPerDay = (stats.totalVisits / daysSinceFirst).toFixed(1);
    document.getElementById('avg-per-day').textContent = avgPerDay;
    
    // Load daily stats table
    loadDailyStatsTable(stats.dailyStats);
}

function getWeekStats(dailyStats) {
    let total = 0;
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        if (dailyStats[dateStr]) {
            total += dailyStats[dateStr].visits;
        }
    }
    
    return total;
}

function getMonthStats(dailyStats) {
    let total = 0;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    Object.keys(dailyStats).forEach(dateStr => {
        const date = new Date(dateStr);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            total += dailyStats[dateStr].visits;
        }
    });
    
    return total;
}

function loadDailyStatsTable(dailyStats) {
    const tbody = document.getElementById('stats-table-body');
    tbody.innerHTML = '';
    
    // Trier les dates par ordre décroissant
    const sortedDates = Object.keys(dailyStats).sort().reverse();
    
    if (sortedDates.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; opacity: 0.5;">Aucune donnée disponible</td></tr>';
        return;
    }
    
    // Limiter aux 30 derniers jours
    sortedDates.slice(0, 30).forEach(date => {
        const stats = dailyStats[date];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(date)}</td>
            <td>${stats.visits}</td>
            <td>${stats.uniqueVisitors}</td>
        `;
        tbody.appendChild(row);
    });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function resetStats() {
    if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les statistiques ?\n\nCette action est IRRÉVERSIBLE et supprimera tout l\'historique des visites.')) {
        localStorage.removeItem(STORAGE_KEYS.STATS);
        loadDashboard();
        showNotification('Statistiques réinitialisées avec succès', 'success');
    }
}

// Navigation
function switchSection(sectionName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Update title
    const titles = {
        dashboard: 'Tableau de bord',
        products: 'Gestion des Produits',
        gallery: 'Gestion de la Galerie',
        contact: 'Informations de Contact',
        settings: 'Paramètres'
    };
    document.getElementById('section-title').textContent = titles[sectionName];
    
    // Load specific section data
    if (sectionName === 'dashboard') {
        loadDashboard();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeDefaultData();
    
    // Check authentication
    if (!checkAuth()) {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
    } else {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'grid';
        loadDashboard();
        loadProducts();
        loadGallery();
        loadContactInfo();
    }
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (login(username, password)) {
            location.reload();
        } else {
            const errorMsg = document.getElementById('login-error');
            errorMsg.textContent = '❌ Nom d\'utilisateur ou mot de passe incorrect';
            errorMsg.classList.add('active');
        }
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = btn.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Products
    document.getElementById('add-product-btn').addEventListener('click', () => openProductModal());
    
    document.getElementById('product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', document.getElementById('product-id').value);
        formData.append('icon', document.getElementById('product-icon').value);
        formData.append('nameFr', document.getElementById('product-name-fr').value);
        formData.append('nameEn', document.getElementById('product-name-en').value);
        formData.append('descFr', document.getElementById('product-desc-fr').value);
        formData.append('descEn', document.getElementById('product-desc-en').value);
        saveProduct(formData);
    });
    
    // Modal close buttons
    document.querySelector('.modal-close').addEventListener('click', closeProductModal);
    document.querySelector('.modal-cancel').addEventListener('click', closeProductModal);
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') {
            closeProductModal();
        }
    });
    
    // Gallery - Nouveau système
    document.getElementById('scan-gallery-btn').addEventListener('click', scanGallery);
    document.getElementById('generate-code-btn').addEventListener('click', generateCode);
    
    document.getElementById('add-image-btn').addEventListener('click', () => {
        document.getElementById('add-new-image').click();
    });
    
    document.getElementById('add-new-image').addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            addNewImages(e.target.files);
            e.target.value = ''; // Reset input
        }
    });
    
    // Close code modal
    document.querySelector('.code-modal-close').addEventListener('click', () => {
        document.getElementById('code-modal').classList.remove('active');
    });
    
    document.getElementById('code-modal').addEventListener('click', (e) => {
        if (e.target.id === 'code-modal') {
            document.getElementById('code-modal').classList.remove('active');
        }
    });
    
    // Save changes button
    document.getElementById('save-changes-btn').addEventListener('click', () => {
        const activeSection = document.querySelector('.content-section.active').id;
        
        if (activeSection === 'contact-section') {
            saveContactInfo();
        } else if (activeSection === 'products-section') {
            exportToMainSite();
        } else {
            showNotification('Modifications enregistrées', 'success');
        }
    });
    
    // Change password form
    document.getElementById('change-password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (changePassword(currentPassword, newPassword, confirmPassword)) {
            e.target.reset();
        }
    });
    
    // Reset buttons
    document.getElementById('reset-products-btn').addEventListener('click', resetProducts);
    document.getElementById('reset-all-btn').addEventListener('click', resetAllData);
    
    // Stats reset button
    document.getElementById('reset-stats-btn').addEventListener('click', resetStats);
});

// Global functions for inline onclick handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.updateImageCategory = updateImageCategory;
window.copyToClipboard = copyToClipboard;
window.deleteImageFromGallery = deleteImageFromGallery;

