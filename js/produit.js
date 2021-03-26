showOne();

async function getId() {  /**** @param : récupération de l'id créée en page listeproduit*/
    const id = JSON.parse(localStorage.getItem("article_id"));
     /**** @param : permet d'appeler le serveur et la page d u descriptif produits*/
    const url = 'http://localhost:3000/api/teddies/' + id;
    return url;
}

async function getTeddy() {  /**** @param : récupération de l'id créée en page listeproduit var1*/
    const message = document.getElementById('message');
    try {
        const url = await getId();
        /*@return response : récupération des détail d'un produit et affichage*/
        const response = await fetch(url);
        const data = await response.json()
        return data;
    } catch (error) {/* ou @return response : erreur de connexion*/
        console.error("erreur de connexion à l'api : " + error);
        message.textContent = "Oops erreur de connexion :/";
        return;
    }
}

async function showOne() { // affiche l element // ou affiche feedback //
  /**** @param var1:  L'ID (identifiant) de l'élément à localiser. donc sur la page listeproduit*/
    const message = document.getElementById('message');
    const elt = await getTeddy();

    /**** @param var2:  L'ID (identifiant) de l'élément à localiser. donc sur la page listeproduit*/
    const div_row = document.getElementById('content');

    /**** @param var3: tag name création d'un élément affiché dans ma page html produit*/
    const product = document.createElement('article');
     /**** @param var4: tag name création d'un élément affiché dans ma page html produit*/
    const details = document.createElement('article');
     /**** @param var5: tag name création d'un élément affiché dans ma page html produit*/
    const divProduct = document.createElement('div');
     /**** @param var6: tag name création d'un élément affiché dans ma page html produit*/
    const divDetails = document.createElement('div');
     /**** @param var7: tag name création d'un élément titre affiché dans ma page html produit*/
    const h2 = document.createElement('h2');
     /**** @param var8: tag name création d'un élément image affiché dans ma page html produit*/
    const image = document.createElement('img');
     /**** @param var8: tag name création d'un élément texte affiché dans ma page html produit*/
    const price = document.createElement('p');
     /**** @param var2: tag name création d'un élément texte affiché dans ma page html produit*/
    const describe = document.createElement('p');
     /**** @param var10: tag name création d'un élément lien affiché dans ma page html produit*/
    const button = document.createElement('a');
     /**** @param var11: tag name création d'un élément bouton affiché dans ma page html produit*/
    const label = document.createElement('label');
     /**** @param var12: tag name création d'un élément bouton dans ma page html produit*/
    const form = document.createElement('select');
    const colors = elt.colors;

    try {
        for (let color of colors) {
            /**** @param var: tag name création d'un élément de choix de couleur sur le produit*/
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            form.appendChild(option);
        }
    } catch (e) {
        message.textContent = "Oops une erreur est survenu :(";
        return false;
    }
    /**** @param : nomination de mes éléments*/
    h2.textContent = "Description :";
    price.textContent = "Prix : " + (parseInt(elt.price, 10) / 100) + ",00 €";
    button.textContent = "Ajouter au panier";
    describe.textContent = elt.description;
    message.textContent = elt.name;

     /**** @param : paramétrage de mon bouton de choix de couleur*/   
    image.setAttribute("src", elt.imageUrl);
    button.setAttribute("id", "add");
    form.setAttribute("id", "liste");
    label.setAttribute("for", "form-control");

    h2.classList.add('h5');
    product.classList.add("col-md-5", "teddys", "m-3", "px-0", "card", "shadow", "border-0");
    divProduct.classList.add("card-body");
    image.classList.add("card-image-top");
    details.classList.add("col-md-5", "teddys", "m-3", "px-0");
    button.classList.add("btn", "btn-info");
    label.classList.add("mr-2");
    form.classList.add("form-control", "form-control-sm");

    div_row.appendChild(product);
    div_row.appendChild(details);
    product.appendChild(divProduct);
    divProduct.appendChild(image);
    details.appendChild(divDetails);
    divDetails.appendChild(h2)
    divDetails.appendChild(describe);
    divDetails.appendChild(price);
    divDetails.appendChild(label);
    label.appendChild(form);
    divDetails.appendChild(button);

    button.addEventListener("click", function () {
        createObject(elt);
        showAlert();
    })
}

function showAlert() { /**** @param var: création d'un message d'alerte*/
    const alert = document.getElementById("alert");
    alert.classList.add("show");

    setTimeout(function () {
        alert.classList.remove("show");
    }, 2000);

}

function createObject(elt) { /**** @param var13: création du produit*/
    const liste = document.getElementById('liste');
    const color = liste.options[liste.selectedIndex].value;
    const product = {
        name: elt.name,
        price: elt.price,
        id: elt._id,
        image: elt.imageUrl,
        color: color,
        inCart: 0
    }
    setItems(product);
}

function setItems(product) { /****  @param var14 C'est une DOMString contenant le nom de la clé que l'on souhaite créer et qui nous sera appelée sur la page panier*/
    const articles = JSON.parse(localStorage.getItem("article_inCart")) || [];
    const indice = articles.findIndex(element => element.id === product.id && element.color === product.color);

    if (indice != -1) {
        articles[indice].inCart += 1;
    } else {
        product.inCart += 1;
        articles.push(product);
    }
/****  C'est une DOMString contenant la valeur associée à son nom de clé que l'on souhaite créer/modifier. */
    localStorage.setItem("article_inCart", JSON.stringify(articles));
}