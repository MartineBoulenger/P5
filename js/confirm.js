/**** @param : récupération de l'id créée en page form pour afficher le prénom*/
const contact = JSON.parse(localStorage.getItem("contact"));
/**** @param : récupération de l'id créée en page form pour ,afficher le montant*/
const orderNb = localStorage.getItem("order");

/**** mise en place de la page confirmation de commande */
/**** @param var1 : création d'un élement id var 3 a 10 pagr form*/
const first = document.getElementById("firstName");
/**** @param var2 : création d'un élement id ligne 117 form*/
const orderId = document.getElementById("orderId");
/**** @param var3 : création d'un élement id */
const mail = document.getElementById("mail");
/**** @param var4 : création d'un élement id */
const message = document.getElementById("message");

message.textContent = "merci " + contact.firstName + " !";
first.textContent = contact.firstName;
orderId.textContent = orderNb;
mail.textContent = contact.email;