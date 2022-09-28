// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    calendar: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startButton.setAttribute('disabled', '')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Wrong date! You can\'t back to the past!', {
        position: 'center-center',
      });
        return;
    }
    refs.startButton.removeAttribute('disabled')
  },
};

flatpickr(refs.calendar, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

class Timer {
  constructor() {
    this.timerID = null;
    this.isActive = false;
  }
  start() {
    if (this.isActive) {
      return;
    }
    const choisedDate = new Date(refs.calendar.value);
    this.isActive = true;
    this.timerID = setInterval(() => {
      const countdown = convertMs(choisedDate - new Date());
      this.recordingCountdown(countdown);
    }, 1000);
      
  }
  recordingCountdown({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
      if (refs.days.textContent === '00' && refs.hours.textContent === '00' && refs.minutes.textContent === '00' && refs.seconds.textContent === '00') {
          clearInterval(this.timerID);
      }

  }
  
}

const timer = new Timer();
refs.startButton.addEventListener('click', () => timer.start());

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
