import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Schedules } from "./functions";
import "./styles.css";

const submitBtn = document.getElementById("submit-form");
const dateForm = document.getElementById("datetime-picker");
const cardSchedule = document.getElementById("schedule-list");
const inputLesson = document.getElementById("input-lesson");

let userDate = new Date();

const options = {
  defaultDate: new Date(),
  dateFormat: "d-m-Y",
  onClose(dateStr) {
    userDate = dateStr;
  },
};
flatpickr(dateForm, options);

submitBtn.addEventListener("click", submitHandler);

function submitHandler(e) {
  e.preventDefault();

  const schedule = {
    date: userDate,
    lesson: inputLesson.value,
  };

  Schedules.create(schedule);
}

function createCardSchedule(countLesson, lesson) {
  cardSchedule.innerHTML = "";
  const markup = "";
  for (let i = 1; i <= countLesson; i++) {
    markup = `<li>${i}. </li>  
    <li>${lesson}</li>`;
    cardSchedule.insertAdjacentHTML("beforeend", markup);
  }
}
