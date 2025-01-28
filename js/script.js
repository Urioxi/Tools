// Récupération des éléments du DOM
const uploadFile = document.getElementById('uploadFile');
const wallpapersList = document.getElementById('wallpapersList');
const randomWallpaperBtn = document.getElementById('randomWallpaper');
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const close = document.getElementById('okButton');
const popup = document.getElementById("popup");

// Fonction pour appliquer le fond d'écran
function setWallpaper(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    localStorage.setItem('backgroundImage', imageUrl);  // Sauvegarder dans localStorage
}

// Fonction pour afficher les fonds d'écran enregistrés
function displayWallpapers() {
    const wallpapers = JSON.parse(localStorage.getItem('wallpapers')) || [];
    wallpapersList.innerHTML = '';  // Vider la liste avant de la remplir

    wallpapers.forEach((wallpaper, index) => {
        const wallpaperDiv = document.createElement('div');
        wallpaperDiv.classList.add('wallpaper');
        wallpaperDiv.style.backgroundImage = `url(${wallpaper})`;

        // Ajouter un événement de clic pour définir l'image comme fond d'écran
        wallpaperDiv.addEventListener('click', () => {
            setWallpaper(wallpaper);  // Appliquer le fond d'écran choisi
        });

        // Bouton pour supprimer le fond d'écran
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteButton');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();  // Empêcher le clic sur l'image de se propager
            deleteWallpaper(wallpaper, index);  // Supprimer le fond d'écran
        });

        wallpaperDiv.appendChild(deleteBtn);
        wallpapersList.appendChild(wallpaperDiv);
    });
}

// Fonction pour enregistrer un nouveau fond d'écran dans localStorage
function saveWallpaper(imageUrl) {
    let wallpapers = JSON.parse(localStorage.getItem('wallpapers')) || [];

    // Vérifier si l'image n'est pas déjà dans la liste
    if (!wallpapers.includes(imageUrl)) {
        wallpapers.push(imageUrl);
        localStorage.setItem('wallpapers', JSON.stringify(wallpapers));
        displayWallpapers();  // Mettre à jour la liste affichée
    } else {
        alert("Wallpaper already saved!");
    }
}

// Fonction pour supprimer un fond d'écran de localStorage
function deleteWallpaper(imageUrl, index) {
    let wallpapers = JSON.parse(localStorage.getItem('wallpapers')) || [];
    wallpapers.splice(index, 1);  // Retirer l'image de la liste
    localStorage.setItem('wallpapers', JSON.stringify(wallpapers));  // Sauvegarder la nouvelle liste
    displayWallpapers();  // Mettre à jour l'affichage
}

// Fonction pour gérer l'upload d'un fichier image
uploadFile.addEventListener('change', (e) => {
    const file = e.target.files[0];

    // Vérifier que le fichier est une image JPEG ou PNG
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            saveWallpaper(imageUrl);  // Enregistrer l'image
            setWallpaper(imageUrl);  // Appliquer immédiatement le fond d'écran
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image (JPEG or PNG).");
    }
});

// Fonction pour appliquer un fond d'écran au hasard parmi les fonds enregistrés
randomWallpaperBtn.addEventListener('click', () => {
    const wallpapers = JSON.parse(localStorage.getItem('wallpapers')) || [];
    if (wallpapers.length > 0) {
        const randomIndex = Math.floor(Math.random() * wallpapers.length);
        setWallpaper(wallpapers[randomIndex]);  // Appliquer un fond d'écran au hasard
    } else {
        alert("No wallpapers saved yet!");
    }
});

// Fonction pour charger le fond d'écran sauvegardé lors du chargement de la page
function loadBackgroundFromLocalStorage() {
    const savedBg = localStorage.getItem('backgroundImage');
    if (savedBg) {
        document.body.style.backgroundImage = `url(${savedBg})`;  // Appliquer le fond d'écran sauvegardé
    }
}

// Fonction pour ouvrir la popup
openPopup.addEventListener("click", () => {
    popup.style.display = "flex"; // Utilise flexbox pour centrer
});

// Fonction pour fermer la popup
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

// Fonction pour fermer la popup avec le bouton "OK"
close.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Fonction pour fermer la popup en cliquant à l'extérieur
window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

// Appeler la fonction pour afficher les fonds d'écran enregistrés et appliquer le fond d'écran au chargement
window.addEventListener("DOMContentLoaded", () => {
    displayWallpapers();  // Afficher les fonds d'écran enregistrés
    loadBackgroundFromLocalStorage();  // Appliquer le fond d'écran sauvegardé au chargement
});
