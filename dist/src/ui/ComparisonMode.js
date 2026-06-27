import { VisualizerComponent } from "./VisualizerComponent.js";
import { TracePlayer } from "../engine/TracePlayer.js";

export class ComparisonMode {
  constructor(
    controller,
    registry,
    onTracesChanged,
    panelsB
  ) {
    this._active = false;

    this._controller = controller;
    this._registry = registry;
    this._onTracesChanged =
      onTracesChanged;

    this._panelsB =
      panelsB;

    this._visualizerB = null;
    this._playerB = null;

    this._metricsPlayerB = null;
    this._infoPlayerB = null;

    this._stepListenerB = null;

    this._currentDataset = [];

    this._traceA = [];
    this._traceLengthA = 0;
    this._traceLengthB = 0;

    this._selectedAlgorithmId =
      Object.values(
        registry
      )[0]?.id ?? null;

    this._comparisonContainer =
      document.getElementById(
        "comparison-container"
      );

    this._sidebarB =
      document.getElementById(
        "sidebar-b"
      );

    this._visualizerContainerB =
      document.getElementById(
        "visualizer-b"
      );

    this._selector =
      document.getElementById(
        "comparison-algorithm-select"
      );

    this._onSelectorChange =
      this._handleAlgorithmChange.bind(
        this
      );
  }

  toggle() {
    if (this._active) {
      this._deactivate();
    } else {
      this._activate();
    }
  }

  notifyTraceA(
    dataset,
    steps
  ) {
    this._currentDataset =
      [...dataset];

    this._traceA = steps;
    this._traceLengthA =
      steps.length;

    if (this._active) {
      this._regenerateTraceB();
    }
  }

  _activate() {
    if (this._active) {
      return;
    }

    this._active = true;

    this._controller.pause();

    this._sidebarB.classList.remove(
      "hidden"
    );

    this._comparisonContainer.classList.remove(
      "hidden"
    );

    this._selector.value =
      this._selectedAlgorithmId;

    this._selector.addEventListener(
      "change",
      this._onSelectorChange
    );

    this._visualizerB =
      new VisualizerComponent(
        this._visualizerContainerB,
        []
      );

    this._playerB =
      new TracePlayer(
        [],
        (step, index) => {
          this._visualizerB.render(
            step,
            index
          );
        }
      );

    this._metricsPlayerB =
      new TracePlayer(
        [],
        step => {
          this._panelsB.metricsPanel.update(
            step
          );
        }
      );

    this._infoPlayerB =
      new TracePlayer(
        [],
        step => {
          this._panelsB.infoPanel.update(
            step
          );
        }
      );

    this._stepListenerB =
      index => {
        this._playerB.handleIndex(
          index
        );

        this._metricsPlayerB.handleIndex(
          index
        );

        this._infoPlayerB.handleIndex(
          index
        );
      };

    this._controller.on(
      "step",
      this._stepListenerB
    );

    this._selector.innerHTML = "";
    Object.values(this._registry).forEach(algorithm => {
      const option = document.createElement("option");
      option.value = algorithm.id;
      option.textContent = algorithm.name;
      if (algorithm.id === this._selectedAlgorithmId) {
        option.selected = true;
      }
      this._selector.appendChild(option);
    });

    this._regenerateTraceB();
  }

  _deactivate() {
    if (!this._active) {
      return;
    }

    this._active = false;

    this._controller.pause();

    this._comparisonContainer.classList.add(
      "hidden"
    );

    this._sidebarB.classList.add(
      "hidden"
    );

    this._selector.removeEventListener(
      "change",
      this._onSelectorChange
    );

    if (this._stepListenerB) {
      this._controller.off(
        "step",
        this._stepListenerB
      );
    }

    this._stepListenerB = null;

    this._playerB = null;
    this._metricsPlayerB = null;
    this._infoPlayerB = null;
    this._visualizerB = null;

    this._visualizerContainerB.innerHTML =
      "";

    this._panelsB.metricsPanel.reset();

    this._panelsB.infoPanel.reset(
      "Waiting..."
    );

    this._panelsB.complexityPanel.reset();

    this._traceLengthB = 0;

    this._onTracesChanged(
      this._traceLengthA,
      null
    );

    this._controller.reset();
  }

  _handleAlgorithmChange() {
    this._selectedAlgorithmId =
      this._selector.value;

    this._regenerateTraceB();
  }

  _regenerateTraceB() {
    if (
      !this._active ||
      !this._playerB
    ) {
      return;
    }

    const algorithm =
      this._registry[
        this._selectedAlgorithmId
      ];

    if (
      !algorithm ||
      this._currentDataset.length === 0
    ) {
      return;
    }

    const steps =
      algorithm.fn(
        this._currentDataset
      );

    this._traceLengthB =
      steps.length;

    this._playerB.loadTrace(
      steps
    );

    this._metricsPlayerB.loadTrace(
      steps
    );

    this._infoPlayerB.loadTrace(
      steps
    );

    this._visualizerB.loadTrace(
      steps
    );

    this._panelsB.complexityPanel.update(
      algorithm
    );

    this._panelsB.metricsPanel.reset();

    this._panelsB.infoPanel.reset(
      "Waiting..."
    );

    this._onTracesChanged(
      this._traceLengthA,
      this._traceLengthB
    );

    this._controller.reset();
  }

  setViewB(mode) {
    this._visualizerB?.setView(
      mode
    );
  }

  get isActive() {
    return this._active;
  }
}