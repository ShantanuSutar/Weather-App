const container = document.querySelector(".container"),
  inputPart = document.querySelector(".input"),
  infoTxt = document.querySelector(".info-txt"),
  inputField = document.querySelector("input"),
  locationBtn = document.querySelector("button");
const myApikey = "422b97949e2d76a193e34a18e39f26b3";
let api;
inputField.addEventListener("keyup", (e) => {
  // if user pressed enter btn and input value is not empty
  if (e.key === "Enter" && inputField.value != "") requestApi(inputField.value);
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
  } else {
    alert("Your browser does not support geolocation api");
  }
});

onSuccess = (position) => {
  // If request allowed we get the coordinates
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApikey}`;
  fetchData();
};

onFailure = (error) => {
  // If request denied display error message
  infoTxt.textContent = error.message;
  infoTxt.classList.add("error");
};

requestApi = (city) => {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApikey}`;
  fetchData();
};

fetchData = () => {
  infoTxt.textContent = "Getting weather details... ";
  infoTxt.classList.add("pending");

  //getting api response and returning it with parsing it into js object
  //Passing api result as an argument in weatherDetails function

  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
};

weatherDetails = (info) => {
  if (info.cod == "404") {
    infoTxt.textContent = `${inputField.value} is not a valid city name`;
    infoTxt.classList.replace("pending", "error");
  } else {
    infoTxt.classList.remove("pending", "error");
    console.log(info);
  }
};
