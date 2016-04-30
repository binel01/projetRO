
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
    //console.log("Les contraintes ajoutées sont: " + contraintes);
    
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
}