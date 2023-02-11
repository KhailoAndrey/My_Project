import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Schedules } from "./functions";
import "./styles.css";

const submitBtn = document.getElementById("submit-form");
const dateForm = document.getElementById("datetime-picker");
const cardSchedule = document.getElementById("schedule-list");
const inputLesson = document.getElementById("input-lesson");

let userDate = new Date().toLocaleDateString();
let userDateArray =[];

const options = {
  defaultDate: new Date(),
  // dateFormat: "Y-d-m",
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
  // Schedules.create(schedule);
  Schedules.get(schedule.date);
  // console.log(Schedules.userDateArray);
    // .then((lessons) => createCardSchedule(lessons));
}

function createCardSchedule(lessons) {
  console.log(lessons);
  const markup = lessons
    .map((lesson) => {
      return `<li>${lesson.lesson}</li>`;
    })
    .join("");
  cardSchedule.insertAdjacentHTML("beforeend", markup);

  // cardSchedule.innerHTML = "";
  // console.log(userDateArray.length);
  // const markup = "";
  // for (let i = 1; i <= userDateArray.length; i++) {
  //   markup = `<li>${i}. </li>
  //   <li>${userDateArray.lesson}</li>`;
  //   cardSchedule.insertAdjacentHTML("beforeend", markup);
  //   console.log(markup);
}
