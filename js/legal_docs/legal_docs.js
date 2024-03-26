let currentUser;

async function policyInit() {
  await includeHTML();
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  loadHeaderInitials();
}

async function privacyInit() {
  await includeHTML();
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  loadHeaderInitials();
}

function goBack() {
  window.history.back();
}
