"use strict";

// dark theme
const darkThemeButton = document.getElementById("dark-theme-btn");
const darkThemeButtonIcon = document.getElementById("dark-theme-btn-icon");
const logo = document.getElementById("logo");
let cardsContainer = document.getElementById("cards-container");
const buttonAll = document.querySelector(".button-all");
const buttonActive = document.querySelector(".button-active");
const buttonInactive = document.querySelector(".button-inactive");
const buttonControls = document.querySelectorAll(".button-controls");

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

// render all data
let allData = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    allData = data;
    renderData(allData);
  });

// render based on type of data
function renderData(data) {
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
                class="toggle"
                id="toggle-${card.id}" 
                name="toggle-${card.id}"
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
  warningScreen();
}

function warningScreen() {
  const removeBtns = document.querySelectorAll(".button-remove");
  const cancelBtns = document.querySelectorAll(".button-cancel");
  const confirmBtns = document.querySelectorAll(".button-confirm");

  removeBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const warningMessage = card.querySelector(".delete-warning");

      const allWarningMessages =
        document.getElementsByClassName("delete-warning");
      for (let warning of allWarningMessages) {
        warning.classList.remove("show");
      }

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
}

buttonAll.addEventListener("click", () => {
  renderData(allData);
});

buttonActive.addEventListener("click", () => {
  const activeItems = allData.filter((item) => item.isActive);
  renderData(activeItems);
});

buttonInactive.addEventListener("click", () => {
  const inactiveItems = allData.filter((item) => !item.isActive);
  renderData(inactiveItems);
});

// prevent default scroll
cardsContainer.addEventListener("click", (e) => {
  if (e.target.closest("label")) {
    e.preventDefault(); // Prevent label default scroll/focus behavior
    const input = e.target
      .closest("label")
      .querySelector("input[type=checkbox]");
    if (input) input.checked = !input.checked; // Toggle checkbox manually
  }
});

buttonControls.forEach((button) => {
  button.addEventListener("click", () => {
    const controls = document.getElementsByClassName("button-controls");
    for (let button of controls) {
      button.classList.remove("active");
    }
    button.classList.add("active");
  });
});
