var heuresDiv = document.querySelector('.heures');
var dateDiv = document.querySelector('.date');
var heuresDivBis = document.querySelector('.heuresb');
var datesDivBis = document.querySelector('.dateb');

var affichageHeure = function(){
    // Déclaration des variables
    var today, annee, listeMois, mois, listeJours, jourNumero, jourNom, heures, minutes, secondes, deuxChiffres, amPm;

    // Récupérer la date actuelle
    today = new Date();

    // Récupérer l'année
    annee = today.getFullYear();

    // Récupérer le mois
    listeMois = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    mois = listeMois[today.getMonth()];

    // Récupérer le numéro du jour
    jourNumero = today.getDate();

    // Récupérer le jour de la semaine
    listeJours = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    jourNom = listeJours[today.getDay()];

    // Fonction pour ajouter un zéro devant les chiffres inférieurs à 10
    deuxChiffres = function(element){
        if(element < 10){
            return element = '0' + element;
        } else {
            return element;
        }
    };

    // Récupérer l'heure au format 12 heures
    heures = today.getHours() % 12 || 12;

    // Déterminer AM ou PM
    amPm = today.getHours() >= 12 ? 'PM' : 'AM';

    // Récupérer les minutes
    minutes = deuxChiffres(today.getMinutes());

    // Récupérer les secondes
    secondes = deuxChiffres(today.getSeconds());

    // Affichage de l'heure et de la date
    heuresDiv.innerHTML = heures + ':' + minutes + ':' + secondes + ` <span class="am-pm">${amPm}</span>`;
    dateDiv.textContent = jourNom + ', ' + jourNumero + ' ' + mois + ' ' + annee;

    // Relancer la fonction après 1 seconde
    setTimeout(affichageHeure, 1000);
};

affichageHeure();
// Handle link clicks and load content dynamically
document.getElementById('aboutLink').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent the default behavior

    const targetURL = this.getAttribute('href');

    // Add fade-out effect to the current content
    document.getElementById('content').classList.add('fade-out');

    // Wait for the fade-out to complete before loading new content
    setTimeout(function() {
        // Fetch the new content
        fetch(targetURL)
            .then(response => response.text())
            .then(data => {
                // Replace content with the new page's content
                document.getElementById('content').innerHTML = data;
                document.getElementById('content').classList.remove('fade-out');
                document.getElementById('content').classList.add('fade-in');
            });
    }, 500);  // Match the duration of the fade-out transition
});