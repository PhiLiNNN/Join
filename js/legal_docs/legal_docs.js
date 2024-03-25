let currentUser;

async function policyInit() {
  await includeHTML();
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  loadHeaderInitials();
}
