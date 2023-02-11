export class Schedules {
//   #URL: "https://school-schedule-6e59d-default-rtdb.europe-west1.firebasedatabase.app/schedules.json";
  //   constructor(URL) {
  //     this.URL = date;
  //   }
  static create(schedule) {
    return fetch(
      "https://school-schedule-6e59d-default-rtdb.europe-west1.firebasedatabase.app/schedules.json",
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
}

// class options {

// }
// export function fetchData(date, method) {
//     fetch(schedules.URL, options)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       });
// }
