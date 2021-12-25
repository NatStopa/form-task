const firstname = document.getElementById("first-name");
const lastname = document.getElementById("last-name");
const clientType = document.getElementById("types");
const pesel = document.getElementById("pesel-input");
const nip = document.getElementById("nip-input");
const form = document.querySelector(".form-section");

function handleSubmit(event) {
  event.preventDefault();
  validatePesel();
  validateNip();
  addCustomer();
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
