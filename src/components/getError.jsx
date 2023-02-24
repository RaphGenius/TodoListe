export function getError(code) {
  console.log(code);
  if (code === "auth/weak-password") {
    return "Mot de passe faible, il doit contenir au moins 6 caractères";
  } else if (code === "auth/email-already-in-use") {
    return "Cette adresse mail est déjà utilisée";
  } else if (code === "auth/wrong-password") {
    return "Le mot de passe indiqué est incorrecte";
  } else {
    return "Attention, ne spam pas, tu vas tout casser! 😠 ";
  }
}
