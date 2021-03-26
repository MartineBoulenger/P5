showAll();

async function getTeddies() { // recupere tous les elements // ou affiche l'erreur //
/*******
 * messaged'erreur ou récupération des produits
* description de ma fonction, elle permet de récupérer les infos sur le serveur
 */
 /**** @param var1: création de l'élément message*/
    const message = document.getElementById("message");
   /**** @param : URL représente un objet qui fournit des méthodes statiques utilisées pour créer des URL d'objet.*/
    const url = 'http://localhost:3000/api/teddies/';
    try {

        const response = await fetch(url);
        /*@return response : récupération des produits et affichage*/
        message.textContent = "Nos produits OricoBears";
        return await response.json();
    } catch (error) {
        /* ou @return response : erreur de connexion*/
        message.textContent = "Oops erreur de connexion :/";
        return;
    }
}

async function showAll() { // affiche tous les elements // ou affiche l'erreur //
    const elts = await getTeddies();
    /**** @param var1: création de l'élément content qui affichera mes produits*/
    const div_row = document.getElementById('content');

    try {

        for (let elt of elts) {
          /**** @param var1: création de l'élément article qui affichera un de me produits*/
            const article = document.createElement('article');

            /**** @param var2: tag name le nom d'un élément ("card-body")*/
            const div1 = document.createElement('div');

            /**** @param var3: tag name le nom d'un élément("card-body") */
            const div2 = document.createElement('div');
            
            /**** @param var4: tag name le nom d'un élément qui affiche ra le nom du produit("card-title") */
            const h2 = document.createElement('h2');

            /**** @param var5: tag name le nom d'un élément qui affichera l'image du produit("card-image-top") */
            const image = document.createElement('img');

            /**** @param var6: tag name le nom d'un élément qui affichera le prix du produit("card-text") */
            const price = document.createElement('p');

            /**** @param var7: tag name le nom d'un élément qui affichera le descriptif du produit("card-text") */
            const describe = document.createElement('p');

            /**** @param var8: tag name le nom d'un élément qui permettra de se rendre sur la page du détail du produit */
            const link = document.createElement('a');

            h2.textContent = elt.name;

            /**** @param s: permet de convertir en nombre (euros).*/
            price.textContent = (parseInt(elt.price, 10) / 100) + ",00 €";

            describe.textContent = elt.description;
            /**** nomination de mes éléments dans mon code html.*/
            article.classList.add("col-md-5", "teddys", "m-3", "px-0", "card", "shadow", "border-0");
            div1.classList.add("card-body");
            div2.classList.add("card-body");
            h2.classList.add("card-title");
            price.classList.add("card-text");
            image.classList.add("card-image-top");
            link.classList.add("product");

            link.setAttribute("href", "produit.html");
            image.setAttribute("id", elt._id);
            image.setAttribute("src", elt.imageUrl);

            div_row.appendChild(article);
            article.appendChild(div1);
            article.appendChild(link)
            link.appendChild(image);
            article.appendChild(div2);
            div1.appendChild(h2);
            div1.appendChild(price);
            div2.appendChild(describe);
        }
    } catch (error) {
        return;
    }
    selectElt();
}

function selectElt() { // creer un liens sur chaque element pour se rendre a la page du détail du produit et stocke l'id //
/**** @param var9: tag name le nom d'un élément qui permettra de se rendre sur la page du détail du produit */
    const links = document.querySelectorAll('a.product');
    for (let link of links) {

        link.addEventListener('click', function (e) {
            /**** C'est une DOMString contenant le nom de la clé que l'on souhaite créer et qui nous sera appelée sur la page produit*/
            localStorage.setItem("article_id", JSON.stringify(e.target.id));
            /**** paramétrage de mon lien */
            link.setAttribute("href", "produit.html");
        })
    }
}