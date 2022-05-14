import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedDate = '';

refs.btnStart.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();
        checkValidDate(selectedDate);
        getTimerValues();
    },
};

flatpickr('#datetime-picker', options);

function checkValidDate(date) {
    if (date < options.defaultDate) {
        Notify.failure('Please choose a date in the future', {
            timeout: 1300,
            showOnlyTheLastOne: true,
            clickToClose: true,
        });
        refs. btnStart.setAttribute('disabled', true);
        return;
    }

    refs. btnStart.removeAttribute('disabled');
}

function getTimerValues() {
    const startTime = Date.now();
    const resultTime = selectedDate - startTime;
    const time = convertMs(resultTime);
    console.log('time', time);

    if (resultTime > 0) {
        updateClockFace(time);
    }

    if (resultTime < 1000) {
        clearInterval(timerId);
    }
}

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
}

refs. btnStart.addEventListener('click', () => {
    if (timerId) {
        return;
    }

    timerId = setInterval(getTimerValues, 1000);
});

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}