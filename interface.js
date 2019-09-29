const FavouriteLanguage = require("./src/favouriteLanguage");
const favouriteLanguage = new FavouriteLanguage();

window.onload = () => {
  const usernameSubmit = document.querySelector("#usernameSubmit");

  usernameSubmit.onclick = async e => {
    e.preventDefault();
    alert(await favouriteLanguage.determine(getUsername()));
  };

  function getUsername() {
    return document.querySelector("#usernameInput").value;
  }
};
