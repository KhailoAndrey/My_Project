export class Schedules {
  constructor() {
    this.userDateArray = [];
  }
  static create(schedule, token) {
    return fetch(
      `https://school-schedule-6e59d-default-rtdb.europe-west1.firebasedatabase.app/schedules.json?=auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify(schedule),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => console.log(response));
  }

  static getLessons(date) {
    return fetch(
      "https://school-schedule-6e59d-default-rtdb.europe-west1.firebasedatabase.app/schedules.json",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(Object.values(response));
        this.userDateArray = Object.values(response).filter(
          (resp) => resp.date === date
        );
        // console.log(this.userDateArray);
        return this.userDateArray;
      });
  }

  static fetch(token) {
    return fetch(
      `https://school-schedule-6e59d-default-rtdb.europe-west1.firebasedatabase.app/schedules.json?=auth=${token}`
    )
      .then((response) => response.json())
      .then((response) => console.log(Object.values(response)));
  }
}

export function createModal(title, content) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const html = `
  <button type="button" class="modal-close-btn">
  <svg width="18px" height="18px">
  <use href="./images/symbol-defs.svg#icon-close-button"></use>
  </svg>
  </button>
<h1>${title}</h1>
<div class="modal-content">${content}</div>
`;
  modal.innerHTML = html;
  mui.overlay("on", modal);
}
//  <img src="./images/close-button.svg"/>

//  <svg width="18px" height="18px">
//   <use href="./images/close-button.svg"></use>
// </svg>;

export function closeModal() {
  mui.overlay("off");
}

export function getAuth() {
  return `
  <form class="mui-form auth-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
    <input type="email" id="email" required>
    <label for="email">Email</label>
  </div>
  <div class="mui-textfield mui-textfield--float-label">
    <input type="password" id="password" required>
    <label for="password">Пароль</label>
  </div>
  <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Войти</button>
</form>
  `;
}

export function authEmailPassword(email, password) {
  const apiKey = "AIzaSyCa6-FTZSE0VBhFhzf2IETcXHGyEZ8D8Sc";
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    })
    .then((data) => data.idToken)
    .catch((error) => alert("Неправильный Email или пароль!"));
}
