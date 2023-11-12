const zborovi = [
  "zdravo",
  "hrana",
  "voda",
  "sonce",
  "mesecina",
  "planina",
  "more",
  "grad",
  "selo",
  "kniga",
  "umetnost",
  "muzika",
  "film",
  "drvo",
  "ptica",
  "riba",
  "ovosje",
  "zima",
  "prolet",
  "ljubov",
];

let vreme;
let counterInterval;

function start() {
  let startButton = document.getElementById("startButton");
  startButton.addEventListener("click", reset);
  vreme = document.getElementById("seconds");
  clearTimer();
}
function reset() {
  let container = document.getElementById("container");
  container.innerHTML = "";
  obidi = 5;
  counter = 0;
  clearTimer();

  init();
}
function init() {
  clearTimer();
  counterInterval = setInterval(function () {
    counter++;
    vreme.innerHTML = counter;
  }, 1000);
  let kojZbor = Math.ceil(Math.random() * zborovi.length - 1);
  let bukvi = zborovi[kojZbor].split("");
  let b1 = -1,
    b2 = -1,
    b3 = -1;
  while (b1 === b2 || b1 === b3 || b2 === b3) {
    b1 = Math.ceil(Math.random() * bukvi.length - 1);
    b2 = Math.ceil(Math.random() * bukvi.length - 1);
    b3 = Math.ceil(Math.random() * bukvi.length - 1);
  }
  let nizaBukvi = [b1, b2, b3];
  let prazniInputi = bukvi.length - 3;
  let container = document.getElementById("container");
  for (let i = 0; i < bukvi.length; i++) {
    const bukva = bukvi[i];
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    if (nizaBukvi.includes(i)) {
      input.value = bukva;
      input.disabled = true;
    } else {
      input.addEventListener("input", function (e) {
        e.preventDefault();
        const vnesenaBukva = e.target.value;
        if (bukva === vnesenaBukva) {
          input.value = bukva;
          input.disabled = true;
          prazniInputi--;
        } else {
          input.value = "";
        }
        obidi--;
        if (prazniInputi === 0) {
          window.alert("Zavrsivte za " + counter + " sekundi.");
          clearTimer();
        } else if (obidi === 0) {
          window.alert("Ne uspeavte da pogodite");
          clearTimer();
        }
      });
    }
    container.appendChild(input);
  }
}

function clearTimer() {
  clearInterval(counterInterval);
  counter = 0;
  vreme.innerHTML = 0;
}

window.addEventListener("load", start);
