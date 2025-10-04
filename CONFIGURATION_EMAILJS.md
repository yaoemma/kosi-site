# 📧 Configuration EmailJS - Guide Complet

Suivez ces étapes pour recevoir les messages de votre site sur **kosinwanze2@gmail.com**

## 📝 Étape 1 : Créer un compte EmailJS (GRATUIT)

1. Allez sur : **https://www.emailjs.com/**
2. Cliquez sur **"Sign Up Free"** (Inscription gratuite)
3. Inscrivez-vous avec votre email **kosinwanze2@gmail.com**
4. Confirmez votre email

## 🔧 Étape 2 : Connecter votre Gmail

1. Une fois connecté à EmailJS, cliquez sur **"Email Services"** dans le menu
2. Cliquez sur **"Add New Service"**
3. Sélectionnez **"Gmail"**
4. Cliquez sur **"Connect Account"**
5. Connectez-vous avec votre Gmail **kosinwanze2@gmail.com**
6. Autorisez EmailJS à envoyer des emails
7. **NOTEZ LE SERVICE ID** (exemple : service_abc123)

## 📄 Étape 3 : Créer un template d'email

1. Cliquez sur **"Email Templates"** dans le menu
2. Cliquez sur **"Create New Template"**
3. Utilisez ce contenu :

**Template Name :** Contact Form KOSI Music

**Subject :** Nouveau message de {{from_name}} - KOSI Music

**Content :**
```
Vous avez reçu un nouveau message depuis votre site KOSI Music !

De : {{from_name}}
Email : {{from_email}}

Message :
{{message}}

---
Envoyé depuis kosimusic.com
```

4. **Variables à utiliser :**
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{to_email}}`

5. Cliquez sur **"Save"**
6. **NOTEZ LE TEMPLATE ID** (exemple : template_xyz789)

## 🔑 Étape 4 : Obtenir votre Public Key

1. Cliquez sur **"Account"** dans le menu
2. Allez dans **"General"**
3. Trouvez **"Public Key"** (aussi appelé User ID)
4. **COPIEZ LA PUBLIC KEY** (exemple : user_abc123xyz)

## ⚙️ Étape 5 : Configurer votre site

1. Ouvrez le fichier **`config.js`** dans votre projet
2. Remplacez les valeurs suivantes :

```javascript
emailjs: {
    serviceID: 'VOTRE_SERVICE_ID',    // Collez le Service ID de l'étape 2
    templateID: 'VOTRE_TEMPLATE_ID',  // Collez le Template ID de l'étape 3
    publicKey: 'VOTRE_PUBLIC_KEY'     // Collez la Public Key de l'étape 4
}
```

**Exemple :**
```javascript
emailjs: {
    serviceID: 'service_abc123',
    templateID: 'template_xyz789',
    publicKey: 'user_abc123xyz'
}
```

3. **Sauvegardez le fichier**

## ✅ Étape 6 : Tester

1. Ouvrez votre site **index.html**
2. Allez dans la section **Contact**
3. Remplissez le formulaire et envoyez un message test
4. Vérifiez votre email **kosinwanze2@gmail.com**
5. Le message devrait arriver en quelques secondes !

## 📊 Limite Gratuite

- **200 emails par mois** (gratuit)
- Largement suffisant pour un site de vente !
- Si vous dépassez, vous pouvez passer à un plan payant

## 🆘 Problèmes ?

Si ça ne fonctionne pas :

1. Vérifiez que les 3 IDs sont corrects dans `config.js`
2. Vérifiez que votre Gmail est bien connecté à EmailJS
3. Regardez la console du navigateur (F12) pour voir les erreurs
4. Vérifiez vos spams dans Gmail

## 📞 Alternative

Si vous préférez, les clients peuvent aussi vous contacter directement via :
- 💬 **WhatsApp** : Le bouton est déjà configuré !
- 📧 **Email direct** : Ils voient votre email sur le site

---

**Une fois configuré, vous recevrez TOUS les messages de votre site directement dans votre Gmail !** 🎉

