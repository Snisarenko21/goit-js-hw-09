import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onsubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onsubmit(e) {
  e.preventDefault();

  const firstDelay = Number(formEl.delay.value);
  const stepDelay = Number(formEl.step.value);
  const amountPromises = Number(formEl.amount.value);
  let startDelay = firstDelay;

  if (startDelay <= 0) {
    return;
  }

  for (let i = 0; i < amountPromises; i += 1) {
    let startPosition = i + 1;

    createPromise(startPosition, startDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          clickToClose: true,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          clickToClose: true,
        });
      });

    startDelay += stepDelay;
  }
}