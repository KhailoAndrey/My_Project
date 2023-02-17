import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
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
// let userDateArray =[];

const options = {
  defaultDate: new Date(),
  dateFormat: "d-m-Y",
  onClose(dateStr) {
    userDate = dateStr[0].toLocaleDateString();
  },
};
console.log(options.defaultDate.toLocaleDateString());

flatpickr(dateForm, options);

submitBtn.addEventListener("click", submitHandler);

function submitHandler(e) {
  e.preventDefault();
  const schedule = {
    date: userDate,
    // lesson: inputLesson.value,
  };
  // Create lessons
  // Schedules.create(schedule);

  // Get lessons
  Schedules.getLessons(schedule.date).then((array) =>
    createCardSchedule(array)
  );
}

function createCardSchedule(array) {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
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

teacherBtn.addEventListener("click", activateModal);

function activateModal() {
  createModal("Авторизация", getAuth());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authHandler, { once: true });
}

function authHandler(e) {
  e.preventDefault();
  const email = e.target.querySelector("#email").value;
  const password = e.target.querySelector("#password").value;
  authEmailPassword(email, password)
    .then(sendLesson)
    .catch((error) => alert("Неправильный Email или пароль!"));

  // .then(Schedules.fetch)
  // })
}

function sendLesson(token) {
  if (!token) {
    closeModal();
    return alert("Введите корректные данные и повторите попытку!");
  }
  // teacherBtn.removeEventListener();
  closeModal();
  teacherBtn.textContent = "Выйти";
  teacherBtn.addEventListener("click", () => {
    token = null;
    inputLesson.addAttribute("disabled");
    sendBtn.addAttribute("disabled");
    return;
  });
  inputLesson.removeAttribute("disabled");
  sendBtn.removeAttribute("disabled");
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const schedule = {
      date: userDate,
      lesson: inputLesson.value,
    };
    Schedules.create(schedule, token);
    Schedules.getLessons(schedule.date).then((array) =>
      createCardSchedule(array)
    );
    inputLesson.value = "";
  });
}
