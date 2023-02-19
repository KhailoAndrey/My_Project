export class Schedules {
  constructor() {
    this.userDateArray = [];
  }

  // Внесение уроков
  static async create(schedule, token) {
    const response = await fetch(
      `https://school-schedule-6e59d-default-rtdb.europe-west1.firebasedatabase.app/schedules.json?=auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify(schedule),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response_1 = await response.json();
    return console.log(response_1);
  }

  // Получение списка уроков
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

  // static fetch(token) {
  //   return fetch(
  //     `https://school-schedule-6e59d-default-rtdb.europe-west1.firebasedatabase.app/schedules.json?=auth=${token}`
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(Object.values(response)));
  // }
}

// Создание модалки
export function createModal(title, content) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const html = `
  <i title="Закрыть" class="modal-close-btn"></i>  
<h1>${title}</h1>
<div class="modal-content">${content}</div>
`;
  modal.innerHTML = html;
  mui.overlay("on", modal);
}

// Закрытие модалки
export function closeModal() {
  mui.overlay("off");
}

// Разметка окна авторизации
export function getAuth() {
  return `
  <form class="mui-form auth-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
    <input type="email" id="email" required>
    <label for="email">Email</label>
  </div>
  <div class="mui-textfield mui-textfield--float-label">
  <input type="password" id="password" required>
  <label for="password">Пароль </label>
  <button type="button" id="togglePassword">
<i class="material-icons eye-cross">visibility_off</i>
      </button> 
  </div>
  <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Войти</button>
  </form>
  `;
}

// Проверка авторизации и получение токена
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
