export class MetricsPanel {
  constructor(
    containerElement,
    suffix = ""
  ) {
    this._comparisonsEl =
      containerElement.querySelector(
        `#metric-comparisons${suffix}`
      );

    this._swapsEl =
      containerElement.querySelector(
        `#metric-swaps${suffix}`
      );

    this._accessesEl =
      containerElement.querySelector(
        `#metric-accesses${suffix}`
      );
  }

  update(step) {
    const meta =
      step?.meta ?? {};

    this._comparisonsEl.textContent =
      meta.comparisons ?? 0;

    this._swapsEl.textContent =
      meta.swaps ?? 0;

    this._accessesEl.textContent =
      meta.accesses ?? 0;
  }

  reset() {
    this._comparisonsEl.textContent =
      "0";

    this._swapsEl.textContent =
      "0";

    this._accessesEl.textContent =
      "0";
  }
}