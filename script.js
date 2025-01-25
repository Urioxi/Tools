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