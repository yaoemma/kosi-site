# KOSI Music - Site de Vente d'Articles de Musique

Bienvenue sur votre site web professionnel pour la vente d'instruments de musique et accessoires !

## 🎵 Fonctionnalités

- **Design Moderne et Responsive** : Interface utilisateur attrayante qui s'adapte à tous les écrans (ordinateur, tablette, mobile)
- **Catalogue de Produits** : Affichage dynamique de vos articles avec système de filtrage par catégorie
- **Panier d'Achat** : Système de panier fonctionnel avec ajout/retrait de produits
- **Navigation Fluide** : Défilement fluide entre les sections
- **Formulaire de Contact** : Section contact pour que vos clients puissent vous joindre
- **Animations** : Animations subtiles pour une meilleure expérience utilisateur

## 📁 Structure des Fichiers

```
KOSI/
│
├── index.html          # Page principale
├── styles.css          # Styles et design
├── script.js           # Fonctionnalités interactives
├── config.js           # Configuration (WhatsApp, téléphone, adresse)
└── README.md          # Documentation
```

## 🚀 Comment Utiliser

1. **Ouvrir le Site** : Double-cliquez sur `index.html` pour ouvrir le site dans votre navigateur
2. **⚠️ IMPORTANT - Configurer WhatsApp** : Ouvrez `config.js` et remplacez `225XXXXXXXXXX` par votre vrai numéro WhatsApp
3. **Personnaliser les Produits** : Éditez le fichier `script.js` pour modifier les produits
4. **Modifier les Couleurs** : Ajustez les couleurs dans `styles.css` (variables CSS ligne 10-19)
5. **Ajouter Vos Images** : Remplacez les emojis par vos propres images de produits

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

## 📞 Support

Pour toute question ou personnalisation supplémentaire, n'hésitez pas à modifier le code selon vos besoins !

## 🚀 Prochaines Étapes

Pour mettre le site en ligne :
1. Hébergez sur un service gratuit comme GitHub Pages, Netlify ou Vercel
2. Ajoutez un nom de domaine personnalisé
3. Intégrez un système de paiement (Stripe, PayPal)
4. Ajoutez une base de données pour gérer les produits

---

**Bonne vente ! 🎵**

