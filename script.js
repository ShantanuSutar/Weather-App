const container = document.querySelector(".container"),
  inputPart = document.querySelector(".input"),
  infoTxt = document.querySelector(".info-txt"),
  inputField = document.querySelector("input"),
  locationBtn = document.querySelector("button"),
  icon = document.querySelector(".container img"),
  arrowBtn = document.querySelector("header i");
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
    //geting required values from the API data
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    // using custom icons according to the fetched weather id
    if (id == 800) icon.src = "icons/clear.svg";
    else if (id >= 200 && id <= 232) icon.src = "icons/strom.svg";
    else if (id >= 600 && id <= 622) icon.src = "icons/snow.svg";
    else if (id >= 701 && id <= 781) icon.src = "icons/haze.svg";
    else if (id >= 801 && id <= 804) icon.src = "icons/cloud.svg";
    else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531))
      icon.src = "icons/rain.svg";
    //let's pass the values to a particular html element
    container.querySelector(".temp .num").textContent = Math.floor(
      temp - 273.15
    );
    container.querySelector(".type").textContent = description;
    container.querySelector(
      ".location span"
    ).textContent = `${city}, ${country}`;
    container.querySelector(".temp .num-2").textContent = Math.floor(
      feels_like - 273.15
    );
    container.querySelector(".humidity span").textContent = `${humidity}%`;

    infoTxt.classList.remove("pending", "error");
    container.classList.add("active");
    console.log(info);
  }
};

arrowBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
