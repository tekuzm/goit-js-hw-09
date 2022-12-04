const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
};

class ColorSwitch {
  constructor({ startBtn, stopBtn }) {
    this.intervalId = null;
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;
    this.stopBtn.disabled = true;
  }

  start() {
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;

    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);

    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
  }
}

// Get random bg color

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Create instance of ColorSwitch

const switcher = new ColorSwitch({
  startBtn: refs.startBtnEl,
  stopBtn: refs.stopBtnEl,
});

// Start color switching after clicking 'Start' button

refs.startBtnEl.addEventListener('click', () => {
  switcher.start();
});

// Stop color switching after clicking 'Stop' button

refs.stopBtnEl.addEventListener('click', () => {
  switcher.stop();
});
