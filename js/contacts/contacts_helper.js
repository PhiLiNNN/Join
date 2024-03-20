function pushAllNeededLetters() {
  currentUser.contacts.forEach((contact) => {
    if (allLetters.includes(contact.name[0].toUpperCase())) return;
    allLetters.push(contact.name[0].toUpperCase());
  });
  allLetters.sort();
}

function getUserInputs(string) {
  const nameInputEl = document.getElementById(`${string}-name-input-id`).value;
  const mailInputEl = document.getElementById(`${string}-mail-input-id`).value;
  const phoneInputEl = document.getElementById(`${string}-phone-input-id`).value;
  const colorCode = document.getElementById(`${string}-color-input-id`).value;
  const textColorCode = isColorLight(colorCode) ? "white" : "black";
  return {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode};
}

function setValidNameInitialsToUpperCase(name) {
  const words = name.trim().split(/\s+/);
  const capitalizedWords = words.map((word) => {
    if (word.includes("-")) {
      const parts = word.split("-");
      return parts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join("-");
    } else return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}

function contactsValidationCheck(string) {
  const nameInputEl = document.getElementById(`${string}-name-input-id`).value;
  const mailInputEl = document.getElementById(`${string}-mail-input-id`).value;
  const phoneInputEl = document.getElementById(`${string}-phone-input-id`).value;
  const boolArr = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  validateContactName(nameInputEl, boolArr);
  validateContactEmail(mailInputEl.toLowerCase(), boolArr);
  validateContactPhone(phoneInputEl, boolArr);
  return handlerFieldValidationContact(string, boolArr);
}

function handlerFieldValidationContact(string, boolArr) {
  toggleVisibility(`${string}-empty-name-id`, boolArr[0]);
  toggleVisibility(`${string}-invalid-name-id`, boolArr[1]);
  toggleVisibility(`${string}-no-special-chars-id`, boolArr[2]);
  toggleVisibility(`${string}-hyphens-name-id`, boolArr[3]);
  toggleVisibility(`${string}-empty-email-id`, boolArr[4]);
  toggleVisibility(`${string}-invalid-email-id`, boolArr[5]);
  toggleVisibility(`${string}-existing-email-id`, boolArr[6]);
  toggleVisibility(`${string}-empty-phone-id`, boolArr[7]);
  toggleVisibility(`${string}-invalid-phone-id`, boolArr[8]);
  toggleVisibility(`${string}-name-border-id`, !boolArr[9], "error-border");
  toggleVisibility(`${string}-mail-border-id`, !boolArr[10], "error-border");
  toggleVisibility(`${string}-phone-border-id`, !boolArr[11], "error-border");
  return !boolArr.some(Boolean);
}

function validateContactPhone(number, boolArr) {
  if (number.trim() === "") boolArr[7] = boolArr[11] = true;
  else if (number.length < 3) boolArr[8] = boolArr[11] = true;
}

function validateContactEmail(email, boolArr) {
  if (email === emailCheck) return;
  if (email.trim() === "") boolArr[4] = boolArr[10] = true;
  else if (!email.includes("@") || email.indexOf("@") === 0 || email.split("@").pop() === "")
    boolArr[5] = boolArr[10] = true;
  else if (currentUser.contacts.some((contact) => contact.email === email))
    boolArr[6] = boolArr[10] = true;
}

function validateContactName(name, boolArr) {
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/0123456789]/;
  const checkForDoubleHyphen = name.split("-").length - 1;
  if (name === nameCheck) return;
  if (name.trim() === "") boolArr[0] = boolArr[9] = true;
  else if (specialCharRegex.test(name)) boolArr[2] = boolArr[9] = true;
  else if (name.length < 2 && checkForDoubleHyphen === 0) boolArr[1] = boolArr[9] = true;
  else if (checkForDoubleHyphen > 1) boolArr[3] = boolArr[9] = true;
  else if (
    checkForDoubleHyphen !== 0 &&
    (!name.match(/[a-zA-Z]-[a-zA-Z]{2,}/) || name.indexOf("-") < 2 || name.split("-").pop() === "")
  )
    boolArr[1] = boolArr[10] = true;
}
