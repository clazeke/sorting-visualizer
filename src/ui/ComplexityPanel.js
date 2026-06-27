export class ComplexityPanel {
  constructor(
    containerElement,
    suffix = ""
  ) {
    this._container =
      containerElement;

    this._nameEl =
      containerElement.querySelector(
        `#complexity-name${suffix}`
      );

    this._descEl =
      containerElement.querySelector(
        `#complexity-description${suffix}`
      );

    this._bestEl =
      containerElement.querySelector(
        `#complexity-best${suffix}`
      );

    this._averageEl =
      containerElement.querySelector(
        `#complexity-average${suffix}`
      );

    this._worstEl =
      containerElement.querySelector(
        `#complexity-worst${suffix}`
      );

    this._spaceEl =
      containerElement.querySelector(
        `#complexity-space${suffix}`
      );

    this._stableEl =
      containerElement.querySelector(
        `#complexity-stable${suffix}`
      );
  }

  update(algorithmEntry) {
    if (!algorithmEntry) {
      this.reset();
      return;
    }

    const {
      name,
      description,
      complexity,
      stable
    } = algorithmEntry;

    this._nameEl.textContent =
      name ?? "";

    this._descEl.textContent =
      description ?? "";

    this._bestEl.textContent =
      complexity?.best ?? "";

    this._averageEl.textContent =
      complexity?.average ?? "";

    this._worstEl.textContent =
      complexity?.worst ?? "";

    this._spaceEl.textContent =
      complexity?.space ?? "";

    this._stableEl.textContent =
      stable
        ? "Yes"
        : "No";
  }

  reset() {
    this._nameEl.textContent = "";
    this._descEl.textContent = "";
    this._bestEl.textContent = "";
    this._averageEl.textContent = "";
    this._worstEl.textContent = "";
    this._spaceEl.textContent = "";
    this._stableEl.textContent = "";
  }
}