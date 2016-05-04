
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
    argent[i] = ($i % 5) + 1;

    // Temps nécessaire à la visite d'un site
    temps[i] = (($i % 3) + 1) * 10;

    // Appréciation des internautes pour le site
    appreciations[i] = ($i % 5) + 1;
}

/* * *****************************************************************
 * 
 * Initialisation du problème et des contraintes
 * 
 * ***************************************************************** */

// Ecriture de la fonction objectif
var objectif = "\* Problem: input *\\n\n" +
        "Maximize\n" +
        "obj: ";
for (var i = 0; i < 13; i++) {
    objectif += "+ x" + i;
}
objectif += "\n\nSubject to \n";

// Ecriture des deux premières contraintes
var A = 1000;
var T = 1000;


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
autresCntes += "\nGenerals\n";
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
var nbreContrainte = $_POST['nbreContrainte'];
var contraintes = $_POST['contraintes'];

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

console.log("obj: " + glp_mip_obj_val(lp));
for (var k = 1; k <= glp_get_num_cols(lp); k++) {
    console.log(glp_get_col_name(lp, k) + " = " + glp_mip_col_val(lp, k));
}

