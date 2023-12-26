document.addEventListener("DOMContentLoaded", function() {
  const image = document.querySelector(".addFolder");
  const inputField = document.querySelector(".folderField");
  image.addEventListener("click", function () {
    image.classList.toggle("active");
    inputField.classList.toggle("active");
    if (inputField.classList.contains("active")) {
      inputField.focus();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const favoritesButton = document.querySelector(".favoritesMenu");

    favoritesButton.addEventListener("click", function () {
      image.classList.add("active");
      inputField.classList.remove("active");
    });
  });

  const menuHide = document.querySelector(".icon-menu-hide");
  const menuShow = document.querySelector(".icon-menu-show");
  const body = document.querySelector("body");

  menuHide.addEventListener("click", function () {
    body.classList.remove("showMenu");
  });
  menuShow.addEventListener("click", function () {
    body.classList.add("showMenu");
  });
});