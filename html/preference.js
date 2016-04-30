var btnvalider = document.getElementById("btn-valider");
btnvalider.addEventListener("click", valider, false);

function valider(){
    var sum = document.getElementById("sum").value;
    var time = document.getElementById("time").value;
    var poids_hour = document.getElementById("poids_hour").value;
    var poids_app = document.getElementById("poids_app").value;
    var poids_tarif = document.getElementById("poids_tarif").value;
   
   if((poids_hour >= 1) && (poids_app >= 1) && (poids_tarif >= 1)){
      if((sum  >= 100) && (time >= 10)){
          
          document.getElementById("container1").style.display = 'none';
          document.getElementById("container2").style.display = 'block';
          document.getElementById("pref").style.background = 'white';
          document.getElementById("cont").style.background = 'greenyellow';
          
    document.getElementById("sum").value = 0;
    document.getElementById("time").value = 0;
    document.getElementById("poids_hour").value = 0;
    document.getElementById("poids_app").value = 0;
    document.getElementById("poids_tarif").value = 0;
         $.jStorage.set('time',time);
         $.jStorage.set('sum',sum);
         $.jStorage.set('poids_hour',poids_hour);
         $.jStorage.set('poids_app',poids_app);
         $.jStorage.set('poids_tarif',poids_tarif);
                   
      } else{
          alert("votre argent doit être supérieur à 100FCFA et vous devez disposez d'au moins 10 minutes");
      }
      
   }
   else{
       alert("vous avez mal rempli un champs. Le poids est toujours supérieure ou égale à 1.");
   }
}