export class InfoPanel {
  constructor(
    containerElement,
    suffix = ""
  ) {
    this._textEl =
      containerElement.querySelector(
        `#info-text${suffix}`
      );
  }

  update(step) {
    this._textEl.textContent =
      step?.meta?.description ??
      "";
  }

  reset(
    message = "Press Play to begin."
  ) {
    this._textEl.textContent =
      message;
  }
}