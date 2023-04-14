// Récupération du formulaire
const form = document.form;

// Expression régulière pour valider les adresses email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

// Fonction qui vérifie si un élément de formulaire n'est pas nul
const nonNull = (element) => {
return (!(element.value === ""))
}

// Fonction qui vérifie si un élément de formulaire ne contient que des lettres
const containsOnlyLetters = (element) => {
const regex = /^[a-zA-Z]+$/;
return regex.test(element.value);
}

//bolean de premier passage de création de div invalide
let checkBoxInvalidCreated=false;
// Fonction qui vérifie si un champ du formulaire est valide sinon affiche une class BS 
const checkElement = (element) => {
  form.inputDate.valid = form.inputDate;
  form.inputLastName.valid =  containsOnlyLetters(form.inputLastName);
  form.inputDate.valid = !inputDate.value === "" || (new Date(inputDate.value) <= new Date());
  form.inputFirstName.valid = containsOnlyLetters(form.inputFirstName);
  //form.inputStatus.valid = nonNull(form.inputStatus);
  form.inputEmail.valid = emailRegex.test(form.inputEmail.value);
  form.inputCheckbox.valid = form.inputCheckbox.checked;
  form.inputMessage.valid = nonNull(form.inputMessage);;

  const submitButton = document.querySelector('input[type="submit"]');
  submitButton.disabled = !(form.inputDate.valid && form.inputLastName.valid && form.inputDate.valid && form.inputFirstName.valid && /* form.inputStatus.valid && */ form.inputEmail.valid && form.inputCheckbox.valid && form.inputMessage.valid);
  console.log(element.name)
  console.log(element.tagName)
  switch(element.tagName){
  // Ajout d'une information d'alerte pour chaque champ invalide
    case ("INPUT"):
    case ("TEXTAREA"): {
      if(!element.valid) {
        console.log("Non valide")
        console.log(element.valid)

        element.classList.add("is-invalid")
        let invalidFeedbackMessage;
        switch(element.name){
          case("inputLastName"): {
            element.placeholder="Le nom est obligatoire."
            invalidFeedbackMessage="nom."
            break;
          }
          case("inputFirstName"): {
            element.placeholder="Le prénom est obligatoire."
            invalidFeedbackMessage="prénom."
            break;
          }
          case("inputEmail"): {
            element.placeholder="L'email est obligatoire."
            invalidFeedbackMessage="L'email n'est pas valide."
            break;
          }
          case("inputMessage"): {
            element.placeholder="Le message est obligatoire."
            invalidFeedbackMessage="message."
            break;
          }
          case("inputDate"): {
            element.placeholder="La date est obligatoire."
            invalidFeedbackMessage="La date doit être valide et anterieure à aujourd'hui."
            break;
          }
          case("inputCheckbox"): {
            element.placeholder="Le checkbox doit etre coché."
            invalidFeedbackMessage="Le checkbox doit etre coché."
            console.log(element.nextElementSibling.tagName)
            break;
          }
        }
        if (element.nextElementSibling===null||element.nextElementSibling.tagName==="LABEL"&&!checkBoxInvalidCreated) {
          if (element.nextElementSibling.tagName==="LABEL")
            checkBoxInvalidCreated=true
          console.log("yeeeeeeeeeeees")
          const invalid = document.createElement("div")
          invalid.innerHTML=invalidFeedbackMessage
          invalid.classList.add("invalid-feedback")
          element.parentElement.append(invalid)
        }
        console.log(element.nextElementSibling)
      }
      else {
        console.log("Valide")
        element.classList.remove("is-invalid")
        element.removeAttribute('placeholder')
      }
   }
  }
}

// Ajout des écouteurs d'événements pour chaque champ du formulaire
form.inputLastName.addEventListener("focusout", () => {
checkElement(form.inputLastName);
});

form.inputDate.addEventListener("focusout", () => {
const inputDateValue = new Date(form.inputDate.value);
const today = new Date();
if (inputDateValue > today) {
console.log("La date est dans le futur");
} else {
console.log("La date est valide");
}
checkElement(form.inputDate);
});

form.inputFirstName.addEventListener("focusout", () => {
checkElement(form.inputFirstName);
});

form.inputStatus.addEventListener("focusout", () => {
checkElement(form.inputStatus);
});

form.inputEmail.addEventListener("focusout", () => {
const emailInput = form.inputEmail.value;
const isValidEmail = emailRegex.test(emailInput);
console.log("Adresse email valide :", isValidEmail);
checkElement(form.inputEmail);
});

form.inputCheckbox.addEventListener("change", () => {
checkElement(form.inputCheckbox);
});

form.inputMessage.addEventListener("focusout", () => {
checkElement(form.inputMessage);
});