# KOSI Music - Site de Vente d'Articles de Musique

Bienvenue sur votre site web professionnel pour la vente d'instruments de musique et accessoires !

## 🎵 Fonctionnalités

- **Design Moderne et Responsive** : Interface utilisateur attrayante qui s'adapte à tous les écrans (ordinateur, tablette, mobile)
- **Catalogue de Produits** : Affichage dynamique de vos articles
- **Galerie d'Images** : Plus de 75 photos d'instruments de musique
- **Multilingue** : Support Français/Anglais avec changement de langue instantané
- **Navigation Fluide** : Défilement fluide entre les sections
- **Formulaire de Contact** : Envoi par Email (EmailJS) ou WhatsApp
- **Animations** : Animations subtiles pour une meilleure expérience utilisateur
- **🆕 Panneau d'Administration** : Gérez votre site sans toucher au code !

## 📁 Structure des Fichiers

```
KOSI/
│
├── index.html                      # Page principale du site
├── styles.css                      # Styles et design
├── script.js                       # Fonctionnalités interactives
├── config.js                       # Configuration (WhatsApp, téléphone, email)
├── translations.js                 # Traductions FR/EN
│
├── admin.html                      # 🆕 Panneau d'administration
├── admin.css                       # 🆕 Styles du panneau admin
├── admin.js                        # 🆕 Fonctionnalités du panneau admin
│
├── images/                         # Dossier des images
│   └── gallery/                    # Images de la galerie (75 photos)
│
└── README.md                       # Documentation principale
```

## 🚀 Comment Utiliser

### Option 1 : Utiliser le Panneau d'Administration (Recommandé) 🆕

1. **Ouvrir le panneau** : Double-cliquez sur `admin.html`
2. **Se connecter** :
   - Utilisateur : `admin`
   - Mot de passe : `kosi2025`
3. **⚠️ Changez le mot de passe** immédiatement après la première connexion
4. **Gérer votre site** sans toucher au code :
   - Voir les statistiques de visite
   - Ajouter/modifier/supprimer des produits
   - Gérer la galerie d'images (scanner/ajouter/supprimer/catégoriser)
   - Modifier les informations de contact
   - Configurer WhatsApp, email, réseaux sociaux

### Option 2 : Modification Manuelle

1. **Ouvrir le Site** : Double-cliquez sur `index.html` pour ouvrir le site dans votre navigateur
2. **⚠️ IMPORTANT - Configurer WhatsApp** : Ouvrez `config.js` et remplacez le numéro WhatsApp
3. **Personnaliser les Produits** : Éditez le fichier `index.html` pour modifier les produits
4. **Modifier les Couleurs** : Ajustez les couleurs dans `styles.css`

## ✏️ Personnalisation

### ⚠️ ÉTAPE OBLIGATOIRE : Configurer votre numéro WhatsApp

**Ouvrez le fichier `config.js`** et modifiez ces informations :

```javascript
const CONFIG = {
    // Votre numéro WhatsApp (format international sans + ni espaces)
    // Exemple: pour +225 07 XX XX XX XX, écrivez: 22507XXXXXXXX
    whatsappNumber: '22507XXXXXXXX', // ⬅️ REMPLACEZ ICI
    
    // Votre numéro de téléphone à afficher
    phoneDisplay: '+225 07 XX XX XX XX', // ⬅️ REMPLACEZ ICI
};
```

**Important** : 
- Le `whatsappNumber` doit être au format international sans espaces ni symboles
- Exemple : Pour le numéro +225 07 12 34 56 78, écrivez : `22507123456578`

### Modifier les Produits

Dans `script.js`, trouvez le tableau `productsData` et ajoutez/modifiez vos produits :

```javascript
{
    id: 1,
    name: "Nom du Produit",
    category: "instruments", // ou "accessoires" ou "audio"
    price: 599.99,
    description: "Description du produit",
    icon: "🎸" // Remplacez par une URL d'image
}
```

### Changer les Couleurs

Dans `styles.css`, modifiez les variables :

```css
:root {
    --primary-color: #6c5ce7;    /* Couleur principale */
    --secondary-color: #a29bfe;   /* Couleur secondaire */
    --accent-color: #fd79a8;      /* Couleur d'accent */
}
```

### Ajouter des Images Réelles

Créez un dossier `images/` et remplacez les emojis par :

```html
<img src="images/votre-produit.jpg" alt="Description">
```

## 📱 Sections du Site

1. **Accueil** : Section hero avec présentation et bouton WhatsApp
2. **Produits** : Catalogue avec système de filtrage (sans prix)
3. **À Propos** : Présentation de votre entreprise
4. **Contact** : Formulaire de contact avec adresse du magasin et WhatsApp

## 🏪 Informations du Magasin

- **Adresse** : Adjamé, Rue E14 - Abidjan, Côte d'Ivoire
- **Contact** : WhatsApp (à configurer dans `config.js`)
- **Type** : Site vitrine (pas de vente en ligne)

## 🎨 Palette de Couleurs

- Violet principal : `#6c5ce7`
- Violet clair : `#a29bfe`
- Rose accent : `#fd79a8`
- Texte : `#2d3436`

## 💡 Conseils

- **Ajoutez vos vraies photos** de produits pour un aspect plus professionnel
- **Mettez à jour les informations de contact** dans la section Contact
- **Ajoutez des liens** vers vos réseaux sociaux dans le footer
- **Testez sur mobile** pour vérifier que tout fonctionne bien

## 🔧 Technologies Utilisées

- HTML5
- CSS3 (avec animations et grid layout)
- JavaScript (vanilla)
- Google Fonts (Poppins)

## 🎛️ Panneau d'Administration

Le panneau d'administration vous permet de gérer facilement votre site :

**Fonctionnalités :**
- 📊 Statistiques de visite en temps réel
- 📦 Gestion des produits (ajouter/modifier/supprimer)
- 🖼️ Gestion de la galerie (scanner/catégoriser/supprimer)
- 📧 Modification des informations de contact
- 🔐 Changement de mot de passe

**Accès :** Ouvrez `admin.html` et connectez-vous avec `admin` / `kosi2025`

## 📞 Support

Pour toute question ou personnalisation supplémentaire, n'hésitez pas à consulter les guides ou à modifier le code selon vos besoins !

## 🚀 Prochaines Étapes

Pour mettre le site en ligne :
1. Hébergez sur un service gratuit comme GitHub Pages, Netlify ou Vercel
2. Ajoutez un nom de domaine personnalisé
3. Intégrez un système de paiement (Stripe, PayPal)
4. Ajoutez une base de données pour gérer les produits

---

**Bonne vente ! 🎵**

