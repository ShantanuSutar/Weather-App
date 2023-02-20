const container = document.querySelector(".container"),
  inputPart = document.querySelector(".input"),
  infoTxt = document.querySelector(".info-txt"),
  inputField = document.querySelector("input");
const myapi = "422b97949e2d76a193e34a18e39f26b3";
inputField.addEventListener("keyup", (e) => {
  // if user pressed enter btn and input value is not empty
  if (e.key === "Enter" && inputField.value != "") requestApi(inputField.value);
});

requestApi = (city) => {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myapi}`;
  infoTxt.textContent = "Getting weather details... ";
  infoTxt.classList.add("pending");

  //getting api response and returning it with parsing it into js object
  //Passing api result as an argument in weatherDetails function

  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
};

weatherDetails = (info) => {
  console.log(info);
};
