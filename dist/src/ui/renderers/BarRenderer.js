import {
  computeSortedIndices,
  getElementColor,
} from "./rendererUtils.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export class BarRenderer {
  constructor(svgElement, steps = []) {
    this.svg = svgElement;
    this._steps = steps;

    this.bars = [];
  }

  render(step, currentIndex) {
    //console.log("BarRenderer steps length:", this._steps.length);
    //console.log("currentIndex:", currentIndex);
    
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

    const gap = 2;
    const slotWidth = width / values.length;

    const actualBarWidth = Math.max(
      1,
      slotWidth - gap
    );

    this._syncBarCount(values.length);

    values.forEach((value, index) => {
      const rect = this.bars[index];

      const barHeight =
        maxValue === 0
          ? 0
          : (value / maxValue) * height;

      const y = height - barHeight;

      rect.setAttribute(
        "x",
        index * slotWidth
      );

      rect.setAttribute("y", y);

      rect.setAttribute(
        "width",
        actualBarWidth
      );

      rect.setAttribute(
        "height",
        barHeight
      );

      rect.setAttribute(
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
    this.bars = [];
  }

  _syncBarCount(targetCount) {
    while (this.bars.length < targetCount) {
      const rect = document.createElementNS(
        SVG_NS,
        "rect"
      );

      this.svg.appendChild(rect);
      this.bars.push(rect);
    }

    while (this.bars.length > targetCount) {
      const rect = this.bars.pop();
      rect.remove();
    }
  }
}