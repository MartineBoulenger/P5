/**** @param var1: tag name création d'un élément formulaire*/
const form = document.querySelectorAll('input');
/**** @param var2: création d'un élément id bouton*/
const btn = document.getElementById("envoi");
btn.addEventListener('click', () => check());

for (let input of form) { // appel la fonction help //
    input.addEventListener('input', function () {
        help(input);
    });
}

function isValid(input) { // compare avec le resultat attendu //
    /**** @param : paramétrage des zones formulaire nombre de lettre minimum ou chiffre*/
    const regex_text = /^[A-zÀ-ú\s]{3,}$/;
    const regex_zip = /^[\d]{5}$/;
    const regex_address = /^[a-z0-9 .,]{10,}$/i;
    const regex_mail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/i;

    if (input.type == "text" && input.name != "address" && regex_text.test(input.value)) {
        return true;
    } else if (input.type == "email" && regex_mail.test(input.value)) {
        return true;
    } else if (input.type == "number" && regex_zip.test(input.value)) {
        return true;
    } else if (input.name == "address" && regex_address.test(input.value)) {
        return true;
    }
    return false;
}
/**** @param : paramétrage des zones formulaire mal renseignés*/
function help(input) { // affiche l'aide et color le champ
    if (isValid(input)) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        const span = input.nextElementSibling;
        span.style.display = "none";
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        const span = input.nextElementSibling;
        span.style.display = "block";
    }
}

function check() { // verifie la validité du form //
    /**** @param var3: création d'un élément id nom*/
    const firstName = document.getElementById('firstname');
    /**** @param var4: création d'un élément id prénom*/
    const lastName = document.getElementById('lastname');
    /**** @param var5: création d'un élément id adresse*/
    const address = document.getElementById('address');
    /**** @param var6: création d'un élément id code postal*/
    const zip = document.getElementById('zip');
    /**** @param var7: création d'un élément id ville*/
    const city = document.getElementById('city');
    /**** @param var8: création d'un élément id email*/
    const email = document.getElementById('email');
    /**** @param var9: création d'un élément id message*/
    const message = document.getElementById('message');
    /**** @param var10: /****  @param var14 C'est une DOMString contenant le nom de la clé que l'on souhaite créer et qui nous sera appelée sur la page formulaire*/
    const articles = JSON.parse(localStorage.getItem("article_inCart"));

    if (!isValid(firstName) || !isValid(lastName) ||
        !isValid(address) || !isValid(city) ||
        !isValid(zip) || !isValid(email)) {
        message.textContent = "Votre formulaire semble contenir des erreurs. Merci de bien renseigner tous les champs";
        return;
    }
    confirm();
}

async function order() { // creer un objet et l envoi //
    /**** @param : récupération de l'id créée en page formulaire var 14*/
    const articles = JSON.parse(localStorage.getItem("article_inCart"));
    const url = "http://localhost:3000/api/teddies/order";

    const object = {
        contact: {
            firstName: form[0].value,
            lastName: form[1].value,
            address: form[2].value,
            city: form[3].value,
            zip: form[4].value,
            email: form[5].value
        },
        products: []
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        for (let article of articles) {
            object.products.push(article.id);
        }
        const data = await fetch(url, options);
        return data.json();

    } catch (error) {
        message.textContent = "Oops une erreur est survenu :(";
        return;
    }
}

async function confirm() { // recupere la reponse // vide le panier // stocke la reponse //
    try {
        /**** @param : récupère la réponse*/
        const response = await order();
        /**** @param : vide le panier*/
        localStorage.clear();
        /**** @param : stocke la réponse de la commande*/
        localStorage.setItem("order", response.orderId);
        /**** @param : stocke la réponse du contact pour la confirmation*/
        localStorage.setItem("contact", JSON.stringify(response.contact));
        window.location.replace("../html/confirm.html");

    } catch (error) {
        message.textContent = "Oops une erreur est survenu :(";

    }
}