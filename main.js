"use strict";

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
                <input type="checkbox" id="toggle" name="toggle" />
                <div class="toggle-wrapper"></div>
                <span class="sr-only">Activate extension</span>
              </label>
            </div>
          </div>
        </div>`;
    });

    cardsContainer.innerHTML = card.join("");
  });

// fetch('data.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); // See the whole object
//     document.querySelector('#title').textContent = data.title;
//     document.querySelector('#description').textContent = data.description;
//   })
//   .catch(error => console.error('Could not load JSON:', error));
