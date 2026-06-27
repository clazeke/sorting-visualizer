export class ControlPanel {
  constructor(containerElement, controller) {
    this._container = containerElement;
    this._controller = controller;

    this._playButton =
      containerElement.querySelector("#btn-play");

    this._pauseButton =
      containerElement.querySelector("#btn-pause");

    this._stepForwardButton =
      containerElement.querySelector(
        "#btn-step-forward"
      );

    this._stepBackwardButton =
      containerElement.querySelector(
        "#btn-step-backward"
      );

    this._resetButton =
      containerElement.querySelector(
        "#btn-reset"
      );

    this._speedSlider =
      containerElement.querySelector(
        "#speed-slider"
      );

    this._stepCounter =
      containerElement.querySelector(
        "#step-counter"
      );

    this._attachEventListeners();

    this.update();
  }

  _attachEventListeners() {
    this._playButton.addEventListener(
      "click",
      () => {
        this._controller.play();
        this.update();
      }
    );

    this._pauseButton.addEventListener(
      "click",
      () => {
        this._controller.pause();
        this.update();
      }
    );

    this._stepForwardButton.addEventListener(
      "click",
      () => {
        this._controller.stepForward();
        this.update();
      }
    );

    this._stepBackwardButton.addEventListener(
      "click",
      () => {
        this._controller.stepBackward();
        this.update();
      }
    );

    this._resetButton.addEventListener(
      "click",
      () => {
        this._controller.reset();
        this.update();
      }
    );

    this._speedSlider.addEventListener(
      "input",
      (event) => {
        const sliderValue =
          Number(event.target.value);

        this._controller.setSpeed(
          1050 - sliderValue
        );

        this.update();
      }
    );
  }

  update() {
    this._playButton.disabled =
      this._controller.isPlaying ||
      this._controller.isFinished;

    this._pauseButton.disabled =
      !this._controller.isPlaying;

    this._stepForwardButton.disabled =
      this._controller.isFinished;

    this._stepBackwardButton.disabled =
      this._controller.currentIndex === 0;

    this._resetButton.disabled =
      this._controller.currentIndex === 0;

    this._stepCounter.textContent =
      `Step: ${this._controller.currentIndex} / ${this._controller.totalSteps - 1}`;
  }
}