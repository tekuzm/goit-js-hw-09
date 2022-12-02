const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

class ColorSwitch {
  constructor() {
    this.intervalId = null;
    refs.stopBtn.disabled = true;
  }

  start() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);

    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  }
}

// Get random bg color

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Create instance of ColorSwitch

const switcher = new ColorSwitch();

// Start color switching after clicking 'Start' button

refs.startBtn.addEventListener('click', () => {
  switcher.start();
});

// Stop color switching after clicking 'Stop' button

refs.stopBtn.addEventListener('click', () => {
  switcher.stop();
});
