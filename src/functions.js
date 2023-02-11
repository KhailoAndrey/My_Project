export class Schedules {
  //   constructor(userDateArray) {
  //     this.userDateArray = [];
  //   }
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
    ).then((response) => response.json());
    // .then((response) => console.log(response));
  }

  static get(date) {
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
        console.log(Object.values(response));
        const userDateArray = Object.values(response).filter(
          (resp) => resp.date === date
        );
        console.log(userDateArray);
      });
    // return this.userDateArray;
  }
}

// export function fetchData(date, method) {
//     fetch(schedules.URL, options)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       });
// }
