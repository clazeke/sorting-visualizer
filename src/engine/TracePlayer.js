export class TracePlayer {
  constructor(steps, onStep) {
    this._steps = steps;
    this._onStep = onStep;
  }

  loadTrace(steps) {
    this._steps = steps;
  }

  handleIndex(index) {
    const step = this._steps[index];
    if (!step) return;
    this._onStep(step, index);
  }
}