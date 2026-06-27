import {
  computeSortedIndices,
  getElementColor,
} from "./rendererUtils.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export class DotRenderer {
  constructor(svgElement, steps = []) {
    this.svg = svgElement;
    this._steps = steps;

    this.dots = [];
  }

  render(step, currentIndex) {
    if (!step || !Array.isArray(step.array)) {
      return;
    }

    const sortedIndices =
      computeSortedIndices(
        this._steps,
        currentIndex
      );

    const values = step.array;

    if (values.length === 0) {
      this._clear();
      return;
    }

    const width =
      this.svg.clientWidth || 800;

    const height =
      this.svg.clientHeight || 400;

    this.svg.setAttribute(
      "viewBox",
      `0 0 ${width} ${height}`
    );

    const maxValue = Math.max(...values);

    const slotWidth =
      width / values.length;

    this._syncDotCount(values.length);

    const padding = 15; // px — keeps dots fully inside
    values.forEach((value, index) => {
      const circle = this.dots[index];

      

      const cx = padding + index * ((width - 2 * padding) / (values.length - 1 || 1));
      const cy = padding + (1 - value / maxValue) * (height - 2 * padding);

      const r = Math.max(
        3,
        slotWidth * 0.3
      );

      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", r);

      circle.setAttribute(
        "fill",
        getElementColor(
          step,
          index,
          sortedIndices
        )
      );
    });
  }

  loadTrace(steps) {
    this._steps = steps;
    this._clear();
  }

  reset() {
    this._clear();
  }

  _clear() {
    this.svg.innerHTML = "";
    this.dots = [];
  }

  _syncDotCount(targetCount) {
    while (this.dots.length < targetCount) {
      const circle =
        document.createElementNS(
          SVG_NS,
          "circle"
        );

      this.svg.appendChild(circle);
      this.dots.push(circle);
    }

    while (this.dots.length > targetCount) {
      const circle = this.dots.pop();
      circle.remove();
    }
  }
}