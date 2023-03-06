// fetching ny custom attribute
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthDisplay]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// set password length and input slider background
//anupam shaw

let password = "";
let passwordLength = 15;
let checkCount = 0;
handleSlider();
//set password
setIndicator("#ccc");

//set the ui part with the actual no and line in the silder
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  //formula to highligh slider circle part
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

//indicator upar se aya hai and indiavtor strenth ka color show krta hai data-indicator se connect hai indriectly
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //indicator.style.shadow=
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
  return getRndInteger(0, 9);
}
function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}
function generateSymbol() {
  // genareta  a random sybols
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}
// check which password is strength and will update teh color
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;
  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}
async function copyContent() {
  try {
    //navigator clipboard writetext is used to cipoed text in clipabbord and it return and api
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
    console.log("empty");
  }
  copyMsg.classList.add("active");
  //after copied message is shown removid th etxt so use setime out function
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
  console.log("hello");
}

//fully understood
// side bar Uii fixed kiya and last ma handlerslider ko call krenge
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});
//copyconetent will run the above conatnet and whill check wheter it can be coped ror not
// to check the checkboxes
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });
  //password is less than 4 so password lentgh is updated
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

// eassier topic
generateBtn.addEventListener("click", () => {
  //zero checkbox
  if (checkCount <= 0) return;
  //same case 4 length wala eade mbhi likhna
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  // new pasword generation

  password = "";

  let funcArr = [];
  if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
  if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);
  // baki sab

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  //baki remaining
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    //to get the random elemnt from that collection only
    password += funcArr[randIndex]();
  }
  //send the password to shuffle
  password = shufflePassword(Array.from(password));
  passwordDisplay.value = password;
  calcStrength();
});

//shuffle the password as the passwrd conatin serial wise

function shufflePassword(array) {
  //fisher yates method of shuffling
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
  console.log("clearS");
  let s = "";
  array.forEach((ele) => (s += ele));
  return s;
}

//suffle th epass
// password = password.split("");

//console.log(password);
// console.log(passwordDisplay.value);
// console.log(passwordDisplay);
//calcutae strength
//allcheck box will coantin all the value of checkboxes
