import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Schedules } from "./functions";
import "./styles.css";

const submitBtn = document.getElementById("submit-form");
const dateForm = document.getElementById("datetime-picker");
const cardSchedule = document.getElementById("schedule-list");
const inputLesson = document.getElementById("input-lesson");
const teacherBtn = document.getElementById("enter-btn");

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
    lesson: inputLesson.value,
  };
  // Create lessons
  // Schedules.create(schedule);

  // Get lessons
  Schedules.getLessons(schedule.date).then((array) =>
    createCardSchedule(array)
  );
}

function createCardSchedule(array) {
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
  // initialize modal element
  var modalEl = document.createElement("div");
  modalEl.style.width = "400px";
  modalEl.style.height = "300px";
  modalEl.style.margin = "100px auto";
  modalEl.style.backgroundColor = "#fff";

  // show modal
  mui.overlay("on", modalEl);
}
