const container = document.querySelector(".container"),
  inputPart = document.querySelector(".input"),
  infoTxt = document.querySelector(".info-txt"),
  inputField = document.querySelector("input");

inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && inputField.value != "")
    console.log(inputField.value);
  // requestApi(inputField.value);
});
