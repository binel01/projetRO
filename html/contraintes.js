var btnpref = document.getElementById('btn-pref');
btnpref.addEventListener('click',prefere, false);

var btnabsolument = document.getElementById("btn-absolument");
btnabsolument.addEventListener("click", absolument,false );

var btnimplication = document.getElementById("btn-implication");
btnimplication.addEventListener("click", implication,false );

var resetBtn= document.getElementById("reset");
resetBtn.addEventListener("click", reset,false );

var validerContrainteBtn = document.getElementById("valider-contrainte");
validerContrainteBtn.addEventListener("click", validerContrainte,false );

var nbreContrainte = 0;

function prefere(){
    
    var prefere1 = document.getElementById('prefere1');
    var prefere2 = document.getElementById('prefere2');
    var elm1,elm2;
    elm1 = prefere1.options[prefere1.selectedIndex].value;
    elm2 = prefere2.options[prefere2.selectedIndex].value;
    if( (elm1 != "") && (elm2 != "") ){
        if(elm1==elm2){
            alert("Vous avez sélectionné une meme ville deux fois");
        }
        else{
            document.getElementById('contrainte-finale').innerHTML +=
                    "<p>Je préfère <strong>"+ prefere1.options[prefere1.selectedIndex].text
                    + "</strong> à <strong>" +prefere2.options[prefere2.selectedIndex].text 
                    + "</strong> </p>";      
            //On client les champs.
            prefere1.options[prefere1.selectedIndex].selected = false;
            prefere2.options[prefere2.selectedIndex].selected = false;
            nbreContrainte = nbreContrainte +1;
            $.jStorage.set("C"+nbreContrainte,"P#"+elm1+"#"+elm2);
        }
    }
    else{
        alert("Vous avez un champ vide. Vous avez oublié de sélectionner une ville");
    }
}

function absolument(){
    var absolument = document.getElementById('absolument');
    var elm1 = absolument.options[absolument.selectedIndex].value;
    if(elm1 == ""){
        alert("vous n'avez rien selectionné");
    }
    else{
        document.getElementById('contrainte-finale').innerHTML +=
                    "<p>Je veux absolument visiter  <strong>"+ absolument.options[absolument.selectedIndex].text
                    + "</strong> </p>";      
            //On client les champs.
            absolument.options[absolument.selectedIndex].selected = false;
            nbreContrainte = nbreContrainte+1;
            $.jStorage.set("C"+nbreContrainte,"A#"+elm1);
    }
}

function implication(){
    var visite1 = document.getElementById('visite1');
    var visite2 = document.getElementById('visite2');
    var elm1,elm2;
    elm1 = visite1.options[visite1.selectedIndex].value;
    elm2 = visite2.options[visite2.selectedIndex].value;
    if( (elm1 != "") && (elm2 !="") ){
        if(elm1==elm2){
            alert("Vous avez sélectionner une meme ville deux fois");
        }
        else{
            //alert("<p>Je  <<"+ prefere1.options[prefere1.selectedIndex].text + ">> à <<" +prefere2.options[prefere2.selectedIndex].text + ">> </p> <br/>");
            document.getElementById('contrainte-finale').innerHTML +=
                    "<p>Je préfère <strong>"+ visite1.options[visite1.selectedIndex].text
                    + "</strong> à <strong>" +visite2.options[visite2.selectedIndex].text 
                    + "</strong> </p>";
            //On client les champs.
            visite1.options[visite1.selectedIndex].selected = false;
            visite2.options[visite2.selectedIndex].selected = false;
            
            nbreContrainte = nbreContrainte+1;
            $.jStorage.set("C"+nbreContrainte,"I#"+elm1+"#"+elm2);          
        }
    }
    else{
        alert("Vous avez un champ vide. Vous avez oublié de sélectionner une ville");
    }
}


function reset(){
    
    document.getElementById('contrainte-finale').innerHTML = "<h3>Resumé de vos contraintes</h3>";
    if(nbreContrainte >= 1){
        for(var i=1; i<= nbreContrainte; i++){
        $.jStorage.deleteKey("C"+i);
        }
    }
    else{
        alert("vous n'avez sélectionné aucune contrainte");
    }       
}

function validerContrainte(){
    
    if(nbreContrainte>=1){
        $.jStorage.set("nbreContrainte",nbreContrainte);
        document.getElementById('contrainte-finale').innerHTML = "<h3>Resumé de vos contraintes</h3>";
        traitement();
        nbreContrainte = 0;
    }
    else{
        alert("vous n'avez sélectionné aucune contrainte");
    }
}