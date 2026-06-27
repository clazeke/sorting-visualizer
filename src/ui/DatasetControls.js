import { generateRandom } from "../utils/arrayUtils.js";

export class DatasetControls {
  constructor(
    containerElement,
    registry,
    onNewTrace
  ) {
    this.container = containerElement;
    this.registry = registry;
    this.onNewTrace = onNewTrace;

    this.currentDataset = [];

    this.algorithmSelect =
      containerElement.querySelector(
        "#algorithm-select"
      );

    this.sizeSlider =
      containerElement.querySelector(
        "#size-slider"
      );

    this.sizeDisplay =
      containerElement.querySelector(
        "#size-display"
      );

    this.randomizeButton =
      containerElement.querySelector(
        "#btn-randomize"
      );

    this.customInput =
      containerElement.querySelector(
        "#custom-input"
      );

    this.applyCustomButton =
      containerElement.querySelector(
        "#btn-apply-custom"
      );

    this._buildAlgorithmOptions();
    this._attachListeners();

    this.sizeDisplay.textContent =
      this.sizeSlider.value;

    this._generateDataset();
    this._runCurrentAlgorithm();
  }

  _buildAlgorithmOptions() {
    this.algorithmSelect.innerHTML =
      "";

    Object.values(
      this.registry
    ).forEach(
      algorithm => {
        const option =
          document.createElement(
            "option"
          );

        option.value =
          algorithm.id;

        option.textContent =
          algorithm.name;

        this.algorithmSelect.appendChild(
          option
        );
      }
    );
  }

  _attachListeners() {
    this.algorithmSelect.addEventListener(
      "change",
      () => {
        this._runCurrentAlgorithm();
      }
    );

    this.sizeSlider.addEventListener(
      "input",
      () => {
        this.sizeDisplay.textContent =
          this.sizeSlider.value;

        this._generateDataset();
        this._runCurrentAlgorithm();
      }
    );

    this.randomizeButton.addEventListener(
      "click",
      () => {
        this._generateDataset();
        this._runCurrentAlgorithm();
      }
    );

    this.applyCustomButton.addEventListener(
      "click",
      () => {
        this._applyCustomInput();
      }
    );
  }

  _generateDataset() {
    const size =
      Number(
        this.sizeSlider.value
      );

    this.currentDataset =
      generateRandom(
        size,
        1,
        100
      );
  }

  _runCurrentAlgorithm() {
    const algorithmId =
      this.algorithmSelect.value;

    const algorithm =
      this.registry[
        algorithmId
      ];

    if (!algorithm) {
      return;
    }

    const steps =
      algorithm.fn(
        this.currentDataset
      );

    this.onNewTrace(
      steps,
      algorithm,
      [...this.currentDataset]
    );
  }

  _applyCustomInput() {
    const raw =
      this.customInput.value.trim();

    if (!raw) {
      alert(
        "Please enter a comma-separated list of integers."
      );
      return;
    }

    const parts =
      raw
        .split(",")
        .map(
          value =>
            value.trim()
        );

    if (
      parts.some(
        part => part === ""
      )
    ) {
      alert(
        "Input contains empty values."
      );
      return;
    }

    const values =
      parts.map(Number);

    if (
      values.some(
        value =>
          !Number.isInteger(
            value
          )
      )
    ) {
      alert(
        "All values must be integers."
      );
      return;
    }

    if (
      values.length < 2 ||
      values.length > 100
    ) {
      alert(
        "Array size must be between 2 and 100 elements."
      );
      return;
    }

    if (
      values.some(
        value =>
          value < 1 ||
          value > 999
      )
    ) {
      alert(
        "Values must be between 1 and 999."
      );
      return;
    }

    this.currentDataset =
      values;

    this._runCurrentAlgorithm();
  }
}