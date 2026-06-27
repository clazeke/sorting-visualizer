import { BarRenderer }
  from "./renderers/BarRenderer.js";

import { DotRenderer }
  from "./renderers/DotRenderer.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export class VisualizerComponent {
  constructor(
    containerElement,
    steps = []
  ) {
    this.container = containerElement;

    this._currentStep = null;
    this._currentIndex = null;

    this._currentView = "bar";

    this.svg = document.createElementNS(
      SVG_NS,
      "svg"
    );

    this.svg.setAttribute(
      "width",
      "100%"
    );

    this.svg.setAttribute(
      "height",
      "100%"
    );

    this.svg.setAttribute(
      "viewBox",
      "0 0 800 400"
    );

    this.container.appendChild(
      this.svg
    );

    this._barRenderer =
      new BarRenderer(
        this.svg,
        steps
      );

    this._dotRenderer =
      new DotRenderer(
        this.svg,
        steps
      );

    this._activeRenderer =
      this._barRenderer;
  }

  render(step, index) {
    this._currentStep = step;
    this._currentIndex = index;

    this._activeRenderer.render(
      step,
      index
    );
  }

  loadTrace(steps) {
    this._barRenderer.loadTrace(
      steps
    );

    this._dotRenderer.loadTrace(
      steps
    );

    this._currentStep = null;
    this._currentIndex = null;
  }

  reset() {
    this._currentStep = null;
    this._currentIndex = null;

    this._barRenderer.reset();
    this._dotRenderer.reset();
  }

  setView(mode) {
    if (
      mode !== "bar" &&
      mode !== "dot"
    ) {
      return;
    }

    if (mode === this._currentView) {
      return;
    }

    this._activeRenderer.reset();

    this._currentView = mode;

    this._activeRenderer =
      mode === "bar"
        ? this._barRenderer
        : this._dotRenderer;

    if (
      this._currentStep &&
      this._currentIndex !== null
    ) {
      this._activeRenderer.render(
        this._currentStep,
        this._currentIndex
      );
    }
  }
}