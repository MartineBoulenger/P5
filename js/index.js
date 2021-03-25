/*******
* scroll button sur chaque page
* description de ma fonction, elle permet de faire un retour en debut de page (boutonscroll)
* @param var1: mise en place de la première variable du scroll
* @param var2: paramétrage de l'évênement scoll button
* @param var: mise en place de la fonction visible ou invisible du bouton
*/
document.addEventListener('DOMContentLoaded', function() {
  window.onscroll = function(ev) {
    document.getElementById("cRetour").className = (window.pageYOffset > 10) ? "cVisible" : "cInvisible";
  };
});




