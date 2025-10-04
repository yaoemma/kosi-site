# 📸 GUIDE : Comment ajouter vos photos dans la galerie

## 📁 Structure des dossiers

```
KOSI/
├── images/
│   └── gallery/
│       ├── README.txt
│       ├── guitare.jpg     ← Ajoutez votre photo ici
│       ├── piano.jpg       ← Ajoutez votre photo ici
│       ├── batterie.jpg    ← Ajoutez votre photo ici
│       ├── microphone.jpg  ← Ajoutez votre photo ici
│       ├── casque.jpg      ← Ajoutez votre photo ici
│       ├── violon.jpg      ← Ajoutez votre photo ici
│       ├── saxophone.jpg   ← Ajoutez votre photo ici
│       ├── enceintes.jpg   ← Ajoutez votre photo ici
│       └── interface.jpg   ← Ajoutez votre photo ici
```

## 🎯 ÉTAPES SIMPLES

### 1️⃣ Prenez des photos de vos instruments
- Utilisez votre téléphone ou appareil photo
- Prenez des photos bien éclairées
- Fond neutre si possible
- Plusieurs angles si vous voulez

### 2️⃣ Renommez vos photos EXACTEMENT comme ceci :

| Instrument | Nom du fichier |
|------------|----------------|
| 🎸 Guitare Électrique | `guitare.jpg` |
| 🎹 Piano Numérique | `piano.jpg` |
| 🥁 Batterie | `batterie.jpg` |
| 🎤 Microphone | `microphone.jpg` |
| 🎧 Casque Audio | `casque.jpg` |
| 🎻 Violon | `violon.jpg` |
| 🎷 Saxophone | `saxophone.jpg` |
| 🔊 Enceintes | `enceintes.jpg` |
| 🎛️ Interface Audio | `interface.jpg` |

⚠️ **IMPORTANT** : Respectez les minuscules et les accents !

### 3️⃣ Mettez vos photos dans le dossier

1. Ouvrez le dossier : `C:\Users\EMMA YAO\Documents\KOSI\images\gallery\`
2. Copiez-collez vos photos dedans
3. Vérifiez que les noms sont corrects

### 4️⃣ Rechargez votre site

1. Fermez le navigateur si le site est ouvert
2. Double-cliquez sur `index.html`
3. VOS PHOTOS S'AFFICHENT ! 🎉

## 💡 CONSEILS

### ✅ Formats acceptés :
- JPG (.jpg) - Recommandé
- PNG (.png)
- WebP (.webp)

### ✅ Taille recommandée :
- Minimum : 800x800 pixels
- Recommandé : 1200x1200 pixels
- Poids : Moins de 2 MB par photo

### ✅ Comment redimensionner vos photos :
1. Ouvrez la photo avec Paint (Windows)
2. Cliquez sur "Redimensionner"
3. Mettez 1200 pixels de largeur
4. Enregistrez

## 🔄 Si une photo n'apparaît pas

Le site affiche automatiquement une photo de remplacement !
- Vérifiez le nom du fichier (minuscules, accents)
- Vérifiez que la photo est bien dans `images/gallery/`
- Actualisez la page (F5)

## 📝 EXEMPLE COMPLET

**Vous avez pris une photo de votre guitare :**

1. La photo s'appelle : `IMG_1234.jpg`
2. Renommez-la en : `guitare.jpg`
3. Copiez-la dans : `C:\Users\EMMA YAO\Documents\KOSI\images\gallery\`
4. Ouvrez `index.html`
5. ✅ Votre guitare s'affiche dans la galerie !

## 🎨 Pour ajouter plus d'instruments

Si vous voulez ajouter d'autres instruments :

1. Ajoutez votre photo dans `images/gallery/`
2. Nommez-la (exemple : `trompette.jpg`)
3. Ouvrez `index.html`
4. Trouvez la section `<!-- Gallery Section -->`
5. Copiez-collez un bloc comme celui-ci :

```html
<div class="gallery-item">
    <img src="images/gallery/trompette.jpg" alt="Trompette">
    <div class="gallery-overlay">
        <h3>Trompette</h3>
        <p>Trompette professionnelle</p>
        <a href="#contact" class="gallery-btn">Nous Contacter</a>
    </div>
</div>
```

## ❓ Questions ?

- Les photos sont stockées localement sur votre ordinateur
- Elles ne seront visibles que quand le site est ouvert depuis votre PC
- Pour mettre le site en ligne avec vos photos, vous devrez les uploader sur un hébergeur

---

**Maintenant, allez prendre de belles photos de vos instruments ! 📸🎵**




