export class Schedules {
  constructor() {
    this.userDateArray = [];
  }
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
