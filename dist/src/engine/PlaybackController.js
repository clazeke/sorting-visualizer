export class PlaybackController {
  constructor() {
    this._index = 0;
    this._playing = false;
    this._delay = 500;
    this._timerId = null;

    this._listeners = {};

    this._totalSteps = 0;
  }

  on(event, fn) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(fn);
  }

  off(event, fn) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event] =
      this._listeners[event].filter(
        listener => listener !== fn
      );
  }

  _emit(event, ...args) {
    (this._listeners[event] ?? []).forEach(
      fn => fn(...args)
    );
  }

  play() {
    if (this._playing) return;

    if (this.totalSteps === 0) return;

    if (this.isFinished) return;

    this._playing = true;

    this._timerId = setTimeout(
      () => this._tick(),
      this._delay
    );
  }

  pause() {
    if (!this._playing) return;

    this._playing = false;

    if (this._timerId !== null) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
  }

  stepForward() {
    if (this.isFinished) {
      this.pause();
      return;
    }

    this._index += 1;

    this._emit(
      "step",
      this._index
    );

    this._emit("tick");

    if (this.isFinished) {
      this.pause();
    }
  }

  stepBackward() {
    if (this._index <= 0) {
      return;
    }

    this._index -= 1;

    this._emit(
      "step",
      this._index
    );

    this._emit("tick");
  }

  reset() {
    this.pause();

    this._index = 0;

    if (this.totalSteps > 0) {
      this._emit(
        "step",
        0
      );
    }

    this._emit("tick");
  }

  setSpeed(delayMs) {
    this._delay = delayMs;
  }

  loadTrace() {
    this.reset();
  }

  setTotalSteps(n) {
    this._totalSteps = n ?? 0;
  }

  get isPlaying() {
    return this._playing;
  }

  get currentIndex() {
    return this._index;
  }

  get totalSteps() {
    return this._totalSteps;
  }

  get isFinished() {
    return (
      this._totalSteps > 0 &&
      this._index >= this._totalSteps - 1
    );
  }

  _tick() {
    this.stepForward();

    if (this._playing) {
      this._timerId = setTimeout(
        () => this._tick(),
        this._delay
      );
    }
  }
}