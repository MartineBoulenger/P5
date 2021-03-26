inCart();

async function getPrice(id) { /**** @param : récupération de l'id créée en page produit*/
    try {
        const url = 'http://localhost:3000/api/teddies/' + id;
        /*@return response : récupération des produits mient au panier et affichage*/
        const response = await fetch(url);
        const data = await response.json();
        return data.price;
    } catch (error) {
        console.error("erreur de connexion à l'api : " + error);
        message.textContent = "Oops erreur de connexion :/";
        return;
    }
}

async function inCart() { /**** @param : récupération des données stockés de la page produit var14*/
    const elts = JSON.parse(localStorage.getItem('article_inCart'));
    showCart(elts);
}

async function showCart(elts) {/**** @param : récupération de l'id créée en page listeproduit var1*/
    const message = document.getElementById("message");
    /**** @param  var2: création de la ligne produit du panier*/
    const content = document.querySelector('tbody');
    /**** @param var3 : création de la ligne sous total du panier*/
    const sous_total = document.getElementById('sous-total');
    let totaux = 0;

    try {
        for (let elt of elts) {
            const price = await getPrice(elt.id);
            /**** @param var4 : création d'un élement dans la table du panier*/
            const tr = document.createElement('tr');
            /**** @param var5 : création d'un élement dans la table du panier*/
            const td_close = document.createElement('td');
            /**** @param var6 : création d'un élement dans la table du panier*/
            const td_img = document.createElement('td');
            /**** @param var7 : création d'un élement dans la table du panier*/
            const td_color = document.createElement('td');
            /**** @param var8 : création d'un élement dans la table du panier*/
            const td_qty = document.createElement('td');
            /**** @param var9 : création d'un élement dans la table du panier*/
            const td_total = document.createElement('td');
            /**** @param var10 : création d'un élement dans la table du panier*/
            const total = document.createElement('span');
            /**** @param var11 : création d'un élement dans la table du panier*/
            const suppr = document.createElement('button');
            /**** @param var12 : création d'un élement dans la table du panier*/
            const link = document.createElement('a');
            /**** @param var13 : création d'un élement dans la table du panier*/
            const down = document.createElement('button');
            /**** @param var14 : création d'un élement dans la table du panier*/
            const up = document.createElement('button');
            /**** @param var15 : création d'un élement dans la table du panier*/
            const qty = document.createElement('span');

            /**** nomination de mes éléments dans mon code html.*/
            suppr.innerHTML = "<ion-icon name='close-circle-outline'></ion-icon>";
            link.innerHTML = "<img src='" + elt.image + "' > ";
            td_color.textContent = elt.color;
            down.innerHTML = "<ion-icon name='chevron-back-circle-outline'></ion-icon>";
            qty.textContent = elt.inCart;
            up.innerHTML = "<ion-icon name='chevron-forward-circle-outline'></ion-icon>";
            total.textContent = (parseInt(price * elt.inCart) / 100) + ",00 €";
            totaux += (parseInt(price * elt.inCart) / 100);
            sous_total.textContent = totaux + ",00 €";

            /**** paramétrage de mon lien */
            link.setAttribute('href', "../html/produit.html");

            td_close.classList.add('col-1');
            td_img.classList.add('col-3');
            td_color.classList.add('col-2');
            td_qty.classList.add('col-3');
            td_total.classList.add('col-3');

            suppr.classList.add('button');
            down.classList.add('button');
            qty.classList.add('qty');
            up.classList.add('button');
            total.classList.add('price');
            tr.classList.add('d-flex');

            content.appendChild(tr);
            tr.appendChild(td_close);
            tr.appendChild(td_img);
            tr.appendChild(td_color);
            tr.appendChild(td_qty);
            tr.appendChild(td_total);
            td_total.appendChild(total);
            td_close.appendChild(suppr);
            td_img.appendChild(link);
            td_qty.appendChild(down);
            td_qty.appendChild(qty);
            td_qty.appendChild(up);

            /**** paramétrage de mon bouton quantité */
            link.addEventListener('click', function () {
                localStorage.setItem('article_id', JSON.stringify(elt.id));
            })
            suppr.addEventListener('click', function () {
                trash(elt, tr, total);
            })
            up.addEventListener('click', function () {
                updateQty(elt, qty, +1);
            })
            down.addEventListener('click', function () {
                updateQty(elt, qty, -1, tr, total);
            })
        }
    } catch (error) {
        orderBtn()
        return;
    }

    message.textContent = "votre panier !";
    /**** C'est une DOMString contenant le nom de la clé que l'on souhaite créer et qui nous sera appelée sur la page panier afin de povoir modifier les quantité ou supprimer l'article*/
    localStorage.setItem('total_price', totaux);
    orderBtn();
}

function orderBtn() { // active et desactive le bouton d envoi // affiche un feedback //
    const message = document.getElementById("message");
     /**** @param : récupération de l'id créée en page listeproduit*/
    const elts = JSON.parse(localStorage.getItem('article_inCart'));
    /**** @param var15 : création d'un élement id order du panier*/
    const order = document.getElementById('order');

    if (!elts || !elts.length) {/**** si le panier ne contient pas d'article annoncer qu'il est vide*/
        message.textContent = "Votre panier est vide";
        order.setAttribute('disabled', true);
        order.addEventListener('click', function () {
            window.location.href = "listeproduit.html";
        })
        return
    } else {/**** si le panier contient des articles passer au formulaire*/
        order.addEventListener('click', function () {
            window.location.href = "form.html";
        })
    }
}

function trash(elt, line, prixLine) { // supprime un element + sa qty + son prix // update le prix //

    const elts = JSON.parse(localStorage.getItem('article_inCart'));
    let sous_total = parseInt(localStorage.getItem("total_price"));
    const order = document.getElementById('order');
    let prixElt = parseInt(prixLine.textContent);
    let new_price = sous_total - prixElt;
    const newArticles = elts.filter(function (el) {
        if ((el.id && el.color) != (elt.id && elt.color)) {
            return true
        }
    })
    localStorage.setItem("article_inCart", JSON.stringify(newArticles));
    localStorage.setItem("total_price", new_price);
    document.getElementById('sous-total').innerText = new_price + ",00 €";

    line.remove();
    orderBtn();
    showAlert();

}

function showAlert() { // affiche un feddback 2 sec //
    const alert = document.getElementById("alert");
    alert.classList.add("show");
    setTimeout(function () {
        alert.classList.remove("show");
    }, 2000);
}

function updateQty(elt, qty, nb, line, prixLine) { // incremete +1 et decremente -1 la qty // supprime un article //

    const articles = JSON.parse(localStorage.getItem('article_inCart'));
    const indice = articles.findIndex(element => element.id === elt.id && element.color === elt.color);

    if (articles[indice].inCart === 1 && parseInt(nb) == -1) {

        trash(elt, line, prixLine);

    } else {

        articles[indice].inCart += parseInt(nb);
        qty.innerHTML = articles[indice].inCart;
        localStorage.setItem('article_inCart', JSON.stringify(articles));
        updatePrice(articles, indice, nb);
    }
}

async function updatePrice(articles, indice, nb) { // incremente +1 et decremente -1 le prix total et sous total //

    sous_total = parseInt(localStorage.getItem("total_price"));
    const price = await getPrice(articles[indice].id);
    const elt_price = parseInt(price) / 100;
    let totaux = document.querySelectorAll('span.price');

    if (parseInt(nb) == -1) {
        sous_total -= elt_price;
    } else {
        sous_total += elt_price;
    }

    totaux[indice].innerHTML = parseInt(price * articles[indice].inCart) / 100 + ",00 €";
    document.getElementById('sous-total').innerText = sous_total + ",00 €";
    localStorage.setItem("total_price", sous_total);
}