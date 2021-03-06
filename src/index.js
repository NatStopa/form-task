const firstname = document.getElementById("first-name");
const lastname = document.getElementById("last-name");
const clientType = document.getElementById("types");
const pesel = document.getElementById("pesel-input");
const nip = document.getElementById("nip-input");
const form = document.querySelector(".form-section");
const incorrectPesel = document.getElementById("incorrect-pesel");
const incorrectNip = document.getElementById("incorrect-nip");
const addPhoto = document.getElementById("photo-input");
const photoPreview = document.getElementById("photo-preview");
const incorrectType = document.getElementById("incorrect-type");
const incorrectPhoto = document.getElementById("incorrect-photo");

function validatePesel() {
  const peselValue = pesel.value;
  if (typeof peselValue !== "string") {
    incorrectPesel.textContent = "Nieprawidłowy Pesel";
    return false;
  }
  if (
    parseInt(peselValue.substring(4, 6)) > 32 ||
    parseInt(peselValue.substring(2, 4)) > 33
  ) {
    incorrectPesel.textContent = "Nieprawidłowy Pesel";
    return false;
  }
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let peselSum = 0;
  const controlNrPesel = parseInt(peselValue.substring(10, 11));
  for (let i = 0; i < weights.length; i++) {
    peselSum += parseInt(peselValue.substring(i, i + 1)) * weights[i];
  }
  peselSum = peselSum % 10;
  let result = (10 - peselSum) % 10;
  if (result === controlNrPesel) {
    return true;
  } else {
    incorrectPesel.textContent = "Nieprawidłowy Pesel";
    return false;
  }
}

function validateNip() {
  const nipValue = nip.value;
  const nipValueCut = nipValue.replace(/-/g, "");
  if (typeof nipValueCut !== "string") {
    incorrectNip.textContent = "Nieprawidłowy NIP";
    return false;
  }
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let nipSum = 0;
  const controlNrNip = parseInt(nipValueCut.substring(9, 10));
  for (let i = 0; i < weights.length; i++) {
    nipSum += parseInt(nipValueCut.substring(i, i + 1)) * weights[i];
  }
  nipSum = nipSum % 11;
  if (nipSum === controlNrNip) {
    return true;
  } else {
    incorrectNip.textContent = "Nieprawidłowy NIP";
    return false;
  }
}

function validatePhoto() {
  if (photoPreview.height !== photoPreview.width) {
    incorrectPhoto.textContent = "Zdjęcie musi być kwadratowe";
    return false;
  }
}

function validation() {
  const clientTypeValue = clientType.value;
  let isValid = true;
  if (clientTypeValue === "Osoba") {
    validatePesel();
    if (validatePesel() === false) {
      isValid = false;
    }
  } else if (clientTypeValue === "Firma") {
    validateNip();
    if (validateNip() === false) {
      isValid = false;
    }
  } else {
    incorrectType.textContent = "Wybierz typ kontrahenta";
    isValid = false;
  }
  if (validatePhoto() === false) {
    isValid = false;
  }
  return isValid;
}

function showMessage() {
  alert("Nie znaleziono metody zapisu");
}

function handleSubmit(event) {
  const isValidated = validation();
  event.preventDefault();
  if (isValidated) {
    axios.post("https://localhost:60001/Contractor/Save").catch(showMessage);
  }
}

form.addEventListener("submit", handleSubmit);

function displayPhoto(event) {
  photoPreview.src = URL.createObjectURL(event.target.files[0]);
  photoPreview.style.display = "block";
}

addPhoto.addEventListener("change", displayPhoto);

function checkCustomerType() {
  const clientTypeValue = clientType.value;
  if (clientTypeValue === "Osoba") {
    pesel.disabled = false;
    nip.disabled = true;
  } else if (clientTypeValue === "Firma") {
    nip.disabled = false;
    pesel.disabled = true;
  } else {
    nip.disabled = true;
    pesel.disabled = true;
  }
}

clientType.addEventListener("change", checkCustomerType);
