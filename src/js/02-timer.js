import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  hoursEl: document.querySelector('span[data-hours]'),
  daysEl: document.querySelector('span[data-days]'),
  minsEl: document.querySelector('span[data-minutes]'),
  secsEl: document.querySelector('span[data-seconds]'),
};

class CountdownTimer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const startTime = new Date(selectedDate);
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const timeComponents = convertMs(deltaTime);

      if (
        timeComponents.days === `00` &&
        timeComponents.hours === `00` &&
        timeComponents.minutes === `00` &&
        timeComponents.seconds === `00`
      ) {
        timer.stop();
      }
      this.onTick(timeComponents);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

refs.startBtn.disabled = true;

let selectedDate = null;

// Show alert once selected date is < than current date (today)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;

      selectedDate = selectedDates[0];

      console.log(selectedDate);
    }
  },
};

// Show calendar after clicking on the input field

flatpickr(refs.input, options);

// Convert milliseconds

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// Format time value

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Start countdown after clicking 'Start' button

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

// Update span elements

function onTickHandler({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minsEl.textContent = minutes;
  refs.secsEl.textContent = seconds;
}

// Create instance of CountdownTimer

const timer = new CountdownTimer({ onTick: onTickHandler });
