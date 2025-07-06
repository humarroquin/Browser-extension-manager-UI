"use strict";

const darkThemeButton = document.getElementById("dark-theme-btn");
const darkThemeButtonIcon = document.getElementById("dark-theme-btn-icon");
const logo = document.getElementById("logo");

darkThemeButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const darkTheme = document.documentElement.classList.contains("dark");

  darkThemeButtonIcon.src = darkTheme
    ? "./assets/images/icon-sun.svg"
    : "./assets/images/icon-moon.svg";

  logo.src = darkTheme
    ? "./assets/images/dark-mode-logo.png"
    : "./assets/images/logo.svg";
});
