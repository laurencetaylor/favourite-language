const FavouriteLanguage = require("./src/favouriteLanguage");
const favouriteLanguage = new FavouriteLanguage();

window.onload = () => {
  const usernameSubmit = document.querySelector("#usernameSubmit");

  usernameSubmit.onclick = async e => {
    e.preventDefault();
    Swal.fire({
      title: "Our best guess:",
      text: await favouriteLanguage.determine(getUsername()),
      confirmButtonText: "OK"
    });
  };

  function getUsername() {
    return document.querySelector("#usernameInput").value;
  }
};
