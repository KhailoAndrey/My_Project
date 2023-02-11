import "./styles.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import {submitHandler} from "./functions"

let date = "";

const submitBtn = document.getElementById("submit-form");
const dateForm = document.getElementById("datetime-picker");

const options = {
  defaultDate: new Date(),
  dateFormat: "d-m-Y",
  onClose(dateStr) {
    date = dateStr;
  },
};
flatpickr(dateForm, options);
submitBtn.addEventListener("click", submitHandler);

function submitHandler(e) {
  e.preventDefault();
  if (date === "") {
    date = new Date();
  }
  console.log(date);
}
