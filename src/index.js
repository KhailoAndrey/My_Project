import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import {
  Schedules,
  createModal,
  closeModal,
  getAuth,
  authEmailPassword,
} from "./functions";
import "./styles.css";

const submitBtn = document.getElementById("submit-form");
const dateForm = document.getElementById("datetime-picker");
const cardSchedule = document.getElementById("schedule-list");
const inputLesson = document.getElementById("input-lesson");
const teacherBtn = document.getElementById("enter-btn");
const sendBtn = document.getElementById("send-lesson");
// const enterBtn = document.getElementById("enter-btn");

let userDate = new Date().toLocaleDateString();
let token = "";

// Опции для библиотеки календаря
const options = {
  defaultDate: new Date(),
  dateFormat: "d-m-Y",
  onClose(dateStr) {
    userDate = dateStr[0].toLocaleDateString();
  },
};
console.log(options.defaultDate.toLocaleDateString());

// Библиотека календаря
flatpickr(dateForm, options);

// Кнопка выбора даты
submitBtn.addEventListener("click", submitHandler);

// Получение списка уроков и вывод расписания
function submitHandler(e) {
  e.preventDefault();
  const schedule = {
    date: userDate,
  };

  // Get lessons
  Schedules.getLessons(schedule.date).then((array) =>
    createCardSchedule(array)
  );
}

// Создание списка расписания
function createCardSchedule(array) {
  // const closeBtn = document.querySelector(".close-btn");
  // closeBtn.addEventListener("click", () => {
  //   closeModal();
  // });
  cardSchedule.innerHTML = "";
  console.log(array);
  const markup = array.map((arr) => `<li>${arr.lesson}</li>`).join("");
  // console.log(markup);
  cardSchedule.insertAdjacentHTML("beforeend", markup);

  // cardSchedule.innerHTML = "";
  // // let markup = "";
  // for (let i = 0; i <= array.length; i++) {
  //   const markup = `<li>${array[i].lesson}</li>`;
  //   cardSchedule.innerHTML += markup;
  //   console.log(markup);
  // }
}

// Слушатель кнопки входа учителя
teacherBtn.addEventListener("click", activateModal);

// Вызов модального окна
function activateModal() {
  if (teacherBtn.textContent === "Выйти") {
    inputLesson.setAttribute("disabled", true);
    sendBtn.setAttribute("disabled", true);
    teacherBtn.textContent = "Войти";
    return;
  }
  createModal("Авторизация", getAuth());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authHandler, { once: true });
}

// Обработка авторизации
function authHandler(e) {
  e.preventDefault();
  const email = e.target.querySelector("#email").value;
  const password = e.target.querySelector("#password").value;
  authEmailPassword(email, password)
    .then(sendLesson)
    .catch((error) => alert("Неправильный Email или пароль!"));
}

// Внесение уроков
function sendLesson(token) {
  console.log(token);
  if (!token) {
    closeModal();
    return alert("Введите корректные данные и повторите попытку!");
  }
  // teacherBtn.removeEventListener();
  closeModal();
  teacherBtn.textContent = "Выйти";
  inputLesson.removeAttribute("disabled");
  sendBtn.removeAttribute("disabled");
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const schedule = {
      date: userDate,
      lesson: inputLesson.value.trim(),
    };
    if (schedule.lesson != "") {
      if (teacherBtn.textContent === "Войти") {
        token = "";
        Notiflix.Notify.failure("Для внесения уроков Вам нужно войти!");
        return;
      }
      Schedules.create(schedule, token);
      Schedules.getLessons(schedule.date).then((array) =>
        createCardSchedule(array)
      );
    } else Notiflix.Notify.failure("Поле урока не может быть пустым!");
    inputLesson.value = "";
  });
}
