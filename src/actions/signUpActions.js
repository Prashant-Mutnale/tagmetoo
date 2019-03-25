import { Signup, BASEURL } from "./constants";

export const signUpAction = signUpData => dispatch => {
  let data = {
    name: "paul rudd",
    movies: ["I Love You Man", "Role Models"]
  };
  console.log("signUpData", signUpData);
  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      Accept: "application/json"
      //   "Content-Type": "application/json"
    },
    body: data
  })
    .then(res => res.json())
    .then(data => {
      console.log("data", data);
    })
    .catch(error => {
      console.log("error", error);
    });
};

// export const signUpAction = signUpData => dispatch => {
//   let data = {
//     name: "paul rudd",
//     movies: ["I Love You Man", "Role Models"]
//   };
//   console.log("signUpData", signUpData);
//   fetch("http://13.59.90.177/tagmetoo/app/user/signup", {
//     method: "POST",
//     headers: {
//       Accept: "application/json"
//       //   "Content-Type": "application/json"
//     },
//     body: JSON.stringify(signUpData)
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log("data", data);
//     })
//     .catch(error => {
//       console.log("error", error);
//     });
// };
