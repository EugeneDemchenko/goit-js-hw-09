import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayForm = document.querySelector('[name="delay"]');
const stepForm = document.querySelector('[name="step"]');
const amountForm = document.querySelector('[name="amount"]');

form.addEventListener('submit', generatorOn)


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });

}

function generatorOn(evt) {
  evt.preventDefault();
let delayValue = Number(delayForm.value)
const stepValue = Number(stepForm.value)
const amountValue = Number(amountForm.value)
  for (let i = 1; i < amountValue + 1; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay}) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
  console.log(delayValue);
  console.log(stepValue);
  console.log(amountValue);
}

// createPromise(2, 1500)
  // .then(({ position, delay }) => {
  //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // })
  // .catch(({ position, delay }) => {
  //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  // });