import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  firstDelayField: document.querySelector('input[name="delay"]'),
  delayStepField: document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
  submitBtnEl: document.querySelector('button'),
};

// Create promise

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

// Set time of promises returning

function onCreatePromise(e) {
  e.preventDefault();
  const amount = Number(refs.amountField.value);
  const firstDelay = Number(refs.delayStepField.value);
  const delayStep = Number(refs.delayStepField.value);

  for (let i = 0; i < amount; i++) {
    createPromise(1 + i, firstDelay + delayStep * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

// Create X promises after clicking 'Create promises' button

refs.submitBtnEl.addEventListener('click', onCreatePromise);
