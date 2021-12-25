const firstname = document.getElementById("first-name");
const lastname = document.getElementById("last-name");
const clientType = document.getElementById("types");
const pesel = document.getElementById("pesel-input");
const nip = document.getElementById("nip-input");
const form = document.querySelector(".form-section");
const incorrectValue = document.querySelector(".incorrect-value");

function validatePesel() {
  const peselValue = pesel.value;
  if (typeof peselValue !== "string") return false;
  if (
    parseInt(peselValue.substring(4, 6)) > 32 ||
    parseInt(peselValue.substring(2, 4)) > 33
  ) {
    incorrectValue.textContent = "Nieprawidłowy pesel";
  }
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let summation = 0;
  const controlNr = parseInt(peselValue.substring(10, 11));
  for (let i = 0; i < weights.length; i++) {
    summation += parseInt(peselValue.substring(i, i + 1)) * weights[i];
  }
  summation = summation % 10;
  let result = (10 - summation) % 10;
  if (result === controlNr) {
    return true;
  } else {
    incorrectValue.textContent = "Nieprawidłowy pesel";
  }
}

function handleSubmit(event) {
  event.preventDefault();
  validatePesel();
  //validateNip();
  //addCustomer();
}

form.addEventListener("submit", handleSubmit);

function checkCustomerType() {
  const clientTypeValue = clientType.value;
  if (clientTypeValue === "Osoba") {
    pesel.disabled = false;
  } else {
    nip.disabled = false;
  }
}

clientType.addEventListener("change", checkCustomerType);
