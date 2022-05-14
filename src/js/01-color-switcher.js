const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};

let intervalId = null;
refs.btnStopEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStartEl.addEventListener('click', onClickStart);
refs.btnStopEl.addEventListener('click', onClickStop);

function onClickStart() {
  changeBodyColor();
  intervalId = setInterval(changeBodyColor, 1000);
  refs.btnStartEl.disabled = true;
  refs.btnStopEl.disabled = false;
}

function onClickStop() {
  clearInterval(intervalId);
  refs.btnStartEl.disabled = false;
  refs.btnStopEl.disabled = true;
}

function changeBodyColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}