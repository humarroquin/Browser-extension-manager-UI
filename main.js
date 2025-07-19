"use strict";

// dark theme
const darkThemeButton = document.getElementById("dark-theme-btn");
const darkThemeButtonIcon = document.getElementById("dark-theme-btn-icon");
const logo = document.getElementById("logo");
let cardsContainer = document.getElementById("cards-container");

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

// pulling data from the JSON file
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const card = data.map((card) => {
      return ` <div class="card">
          <div class="card-top display-flex">
            <img src="${card.logo}" alt="" />
            <div class="card-header">
              <h2 class="secondary-heading">${card.name}</h2>
              <p>
                ${card.description}
              </p>
            </div>
          </div>
          <div class="card-bottom display-flex">
            <button class="button-remove">Remove</button>
            <div class="toggle-container">
              <label>
                <input 
                type="checkbox" 
                id="toggle" 
                name="toggle"
                ${card.isActive ? "checked" : ""}
                 />
                <div class="toggle-wrapper"></div>
                <span class="sr-only">Activate extension</span>
              </label>
            </div>
          </div>
          <div class="delete-warning">
            <p>Are you sure you want to remove this extension?</p>
            <div class="btn-wrapper">
              <button class="button-remove active button-confirm">Confirm</button>
              <button class="button-remove button-cancel">Cancel</button>
            </div>
          </div>
        </div>`;
    });

    // add cards to the html
    cardsContainer.innerHTML = card.join("");

    // show warning
    const removeBtns = document.querySelectorAll(".button-remove");
    const cancelBtns = document.querySelectorAll(".button-cancel");
    const confirmBtns = document.querySelectorAll(".button-confirm");

    removeBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        const warningMessage = card.querySelector(".delete-warning");
        warningMessage.classList.add("show");
      });
    });

    cancelBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        const warningMessage = card.querySelector(".delete-warning");
        warningMessage.classList.remove("show");
      });
    });

    confirmBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        card.remove();
      });
    });
  });
