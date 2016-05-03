
function traitement(){
    var sum = $.jStorage.get('sum');
    var time = $.jStorage.get('time');
    var poids_hour = $.jStorage.get('poids_hour');
    var poids_app = $.jStorage.get('poids_app');
    var poids_tarif = $.jStorage.get('poids_tarif');
    
    var nbreContrainte = $.jStorage.get('nbreContrainte');
    
    //*
    var contraintes = "";
    for (var i=1; i<=nbreContrainte; i++) {
        var chaine = $.jStorage.get("C" + i);
        var tab = chaine.split("#");
        var chaine2 = "";
        var temp = i+2;
        
        if (tab[0] == 'P') {
            chaine2 = "cnt" + temp + ": + 1 x" + tab[1] + " - 1 x" + tab[2] + " >= 0";
        }
        else if (tab[0] == 'A') {
            chaine2 = "cnt" + temp + ": + 1 x" + tab[1] + " = 1";
        }
        else {
            chaine2 = "cnt" + temp + ": + 1 x" + tab[2] + " - 1 x" + tab[1] + " >= 0";
        }
        contraintes += chaine2 + "\n";
        chaine2 = "";
        tab = [];
    }
    
    //*/
    console.log("Les contraintes ajoutées sont: " + contraintes);
    
    
/* * *********************************************************************************************
 * 
 * Initialisation des données (tableaux): argent, sites, temps et appréciation des internautes 
 * 
 * ********************************************************************************************* */

var sites = [
    "La Plaza",
    "Chez Wou",
    "Le Biniou",
    "L'awalé",
    "La Marmite du boulevard",
    "Hilton Yaoundé",
    "Le moulin de Don Quichotte",
    "Istanbul Turkish Restaurant",
    "Statue de charles Atangana",
    "Monument de la réunification",
    "Musée National",
    "Bois Saint Anastasie",
    "Parc de Yaoundé",
];

var argent = [];
var temps = [];
var appreciations = [];

for (var i = 0; i < 13; i++) {
    // Argent nécessaire à la visite d'un site
    argent[i] = (i % 5) + 1;

    // Temps nécessaire à la visite d'un site
    temps[i] = ((i % 3) + 1) * 10;

    // Appréciation des internautes pour le site
    appreciations[i] = (i % 5) + 1;
}

/* * *****************************************************************
 * 
 * Initialisation du problème et des contraintes
 * 
 * ***************************************************************** */

// Ecriture de la fonction objectif
var objectif = "Maximize\n" +
        "obj: ";
for (var i = 0; i < 13; i++) {
    objectif += "+ x" + i;
}
objectif += "\n\nSubject to \n";

// Ecriture des deux premières contraintes
var A = sum;
var T = time;


// Contrainte n°1
var cnt1 = "cnt1: + " + argent[0] + " x0";
for (var i = 1; i < 13; i++) {
    cnt1 += " + " + argent[i] + " x" + i;
}
cnt1 += " <= " + A + "\n";

// Contrainte n°2
var cnt2 = "cnt2: + " + temps[0] + " x0";
for (var i = 1; i < 13; i++) {
    cnt2 += " + " + temps[i] + " x" + i;
}
cnt2 += " <= " + T + "\n";

// Toutes les variables sont entre 0 ou 1
var autresCntes = "\nBounds\n";
for (var i = 0; i < 13; i++) {
    autresCntes += "0 <= x" + i + " <= 1\n";
}

// Toutes les ariables sont entières
autresCntes += "\nGeneral\n";
for (var i = 0; i < 13; i++) {
    autresCntes += "x" + i + "\n";
}

autresCntes += "\nEnd\n";

// Ajout du problème et des contraintes au fichier final
var probleme = objectif + cnt1 + cnt2;


/* * ***************************************************************************
 * 
 * Récupération des préférences du client et ajout dans le problème final
 * 
 * ************************************************************************** */
//var nbreContrainte = $_POST['nbreContrainte'];
//var contraintes = $_POST['contraintes'];

probleme += contraintes;

probleme += autresCntes;

/* * **************************************************************************
 * 
 * Résolution du problème avec glpk.js
 * 
 * ************************************************************************** */

start = new Date();
var lp = glp_create_prob();
glp_read_lp_from_string(lp, null, probleme);

glp_scale_prob(lp, GLP_SF_AUTO);

var smcp = new SMCP({presolve: GLP_ON});
glp_simplex(lp, smcp);

var iocp = new IOCP({presolve: GLP_ON});
glp_intopt(lp, iocp);


/****************************************************************************
 * 
 * Affichage de la solution obtenue
 * 
 ****************************************************************************/

var compt = 0;
var message = "Les villes que vous pouvez visiter sont les suivantes: \n";
console.log("obj: " + glp_mip_obj_val(lp));

        document.getElementById("container2").style.display = 'none';
        document.getElementById("menu").style.display = 'none';

        document.getElementById('container3').innerHTML = message;
        document.getElementById('container3').style.background = "white";
        document.getElementById('container3').style.color = "black";
var container3 = document.getElementById('container3') ;

container3.innerHTML = "<h1 style=\" margin-top : 20px;\"> La liste des sites à visiter est : </h1><br/>";


var message;
for (var k = 1; k <= glp_get_num_cols(lp); k++) {
    if (glp_mip_col_val(lp, k)) {
        container3.innerHTML += "<p style=\"background-color: greenyellow;\">"+ sites[compt] + "</p>";
    message += sites[compt]+"\n";
    }
        
    console.log(glp_get_col_name(lp, k) + " = " + glp_mip_col_val(lp, k));
    compt++;
}

alert(message);
        


/*********************************************************************
 * Ancienne version du code, celle utilisant la résolution en php
 ********************************************************************/
    /*
    var contraintes = "";
    for (var i=1; i<=nbreContrainte; i++) {
        var chaine = $.jStorage.get("C" + i);
        var tab = chaine.split("#");
        var chaine2 = "";
        
        if (tab[0] == 'P') {
            chaine2 = "x" + tab[1] + " >= " + "x" + tab[2] + ";";
        }
        else if (tab[0] == 'A') {
            chaine2 = "x" + tab[1] + " = 1;";
        }
        else {
            chaine2 = "x" + tab[2] + " >= " + "x" + tab[1] + ";";
        }
        contraintes += chaine2 + "\n";
        chaine2 = "";
        tab = [];
    }
    
    //*/
    
    /*
    $.post("../php/resolution.php", 
        {
            sum: sum,
            time: time,
            poids_hour: poids_hour,
            poids_app: poids_app,
            poids_tarif: poids_tarif,
            nbreContrainte: nbreContrainte,
            contraintes: contraintes
            
        },
        function (data, status) {
            alert(data);
        }
    );
    
    contraintes = "";  
    //*/
}

