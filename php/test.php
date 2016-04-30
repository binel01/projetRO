<?php

$sites = array();
$argent = array();
$temps = array();
$appreciations = array();
$probleme;



/* * *********************************************************************************************
 * 
 * Initialisation des données des tableaux: argent, sites, temps et appréciation des internautes 
 * 
 * ********************************************************************************************* */


$sites[] = "La Plaza";
$sites[] = "Chez Wou";
$sites[] = "Le Biniou";
$sites[] = "L'awalé";
$sites[] = "La Marmite du boulevard";
$sites[] = "Hilton Yaoundé";
$sites[] = "Le moulin de Don Quichotte";
$sites[] = "Istanbul Turkish Restaurant";
$sites[] = "Statue de charles Atangana";
$sites[] = "Monument de la réunification";
$sites[] = "Musée National";
$sites[] = "Bois Saint Anastasie";
$sites[] = "Parc de Yaoundé";

//*
for ($i = 0; $i < 13; $i++) {
    // Appreciations
    $appreciations[$i] = ($i % 5) + 1;

    // Remplissage du tableau des sommes d'argent
    $argent[$i] = (($i % 4) + 1) * 200;

    // Remplissage du tableau des temps nécessaires
    $temps[$i] = (($i % 3) + 1) * 10;
}

/* * *****************************************************************
 * 
 * Initialisation du problème et des contraintes
 * 
 * ***************************************************************** */
// Ecriture de la fonction objectif
$obj = "max: ";

for ($i = 0; $i < 13; $i++) {
    if ($i != 12)
        $obj .= "x" . $i . " + ";
    else
        $obj .= "x" . $i . ";";
}


// Ecriture des deux premières contraintes
$A = $_POST['sum'];
$T = $_POST['time'];

// Contrainte n°1
$contrainte1 = $argent[0] . "x" . 0 . " ";
for ($i = 1; $i < 13; $i++) {
    $xi = "+ " . $argent[$i] . "x" . $i;
    $contrainte1 .= $xi . " ";
}
$contrainte1 .= "<= " . $A . ";";

// Contrainte n°2
$contrainte2 = $temps[0] . "x" . 0 . " ";
for ($i = 1; $i < 13; $i++) {
    $xi = "+ " . $temps[$i] . "x" . $i;
    $contrainte2 .= $xi . " ";
}
$contrainte2 .= "<= " . $T . ";";

// Toutes les variables sont entières, entre 0 ou 1
// int xi; xi <= 1
$cntesDeSigne = "";
$autreCntes = "";

for ($i = 0; $i < 13; $i++) {
    $var2 = "x" . $i . " <= 1;";
    $autreCntes .= $var2 . "\n";
    $var = "int x" . $i . ";";
    $cntesDeSigne .= $var . "\n";
}


$probleme = $obj . "\n" . $contrainte1 . "\n" . $contrainte2 . "\n";
//echo "<br><br>Affichage du probleme final: <br><br>" . $probleme;

/*
 * 
 * Ici, on doit récupérer les autres contraintes et les ajouter au
 * problème avant de passer à la résolution
 * 
 * 
 * 
 */

$nbreContrainte = $_POST['nbreContrainte'];
$contraintes = $_POST['contraintes'];

//print_r($contraintes);

$probleme .= $contraintes . "\n";

$probleme .= $autreCntes . $cntesDeSigne;
echo "\n\nProbleme final: \n" . $probleme . "\n\n";

//*/





/* * **************************************************************************
 * 
 * Résolution du problème avec lpSolve
 * 
 * ************************************************************************** */


// Affichage du probleme  et de sa solution deirectement dans la page web
// Création du fichier contenant e problème
$fichierPb = fopen("probleme.lp", w) or die("Erreur: impossible de creer le fichier");
fwrite($fichierPb, $probleme);
fclose($fichierPb);

// Résoluion du problème à l'aide de LPSolve
passthru("lp_solve probleme.lp > solution.txt");

// Affichage de la solution
//echo "<br><br>Affichage de la solution au probleme<br><br>";
$fichierPb = fopen("solution.txt", r) or die("Erreur: impossible de lire le fichier");
$compt = 0;
$solution = array();
$erreur = "";
while (!feof($fichierPb)) {
    $var1 = fgets($fichierPb);
    $tab = str_split($var1, 1);

    if ($var1 == "This problem is infeasible\n") {
        $erreur = "\nDésolé, aucun site ne correspond à vos attentes\n";
    }
    if ($compt > 3) {
        array_push($solution, $tab[32]);
    }
    $compt++;
}
fclose($fichierPb);

/* * **************************************************************************
 * 
 * Affichage de la solution obtenue
 * 
 * ************************************************************************** */


if ($erreur == "") {
    echo "Les sites que vous pouvez visiter sont les suivants: \n";
    for ($i = 0; $i < 13; $i++) {
        if ($solution[$i])
            echo $sites[$i] . "\n";
    }
}
else {
    echo $erreur;
}
?>


