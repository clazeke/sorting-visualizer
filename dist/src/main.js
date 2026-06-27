import { PlaybackController } from "./engine/PlaybackController.js";
import { TracePlayer } from "./engine/TracePlayer.js";

import { registry } from "./algorithms/registry.js";

import { VisualizerComponent } from "./ui/VisualizerComponent.js";
import { ControlPanel } from "./ui/ControlPanel.js";
import { MetricsPanel } from "./ui/MetricsPanel.js";
import { InfoPanel } from "./ui/InfoPanel.js";
import { ComplexityPanel } from "./ui/ComplexityPanel.js";
import { DatasetControls } from "./ui/DatasetControls.js";
import { ComparisonMode } from "./ui/ComparisonMode.js";
import { ThemeManager } from "./ui/ThemeManager.js";

new ThemeManager(document.getElementById("btn-theme-toggle"));

/*
|--------------------------------------------------------------------------
| Primary Visualizer
|--------------------------------------------------------------------------
*/

const visualizer =
  new VisualizerComponent(
    document.getElementById(
      "visualizer"
    ),
    []
  );

const controller =
  new PlaybackController();

/*
|--------------------------------------------------------------------------
| Panels A
|--------------------------------------------------------------------------
*/

const metricsPanel =
  new MetricsPanel(
    document.getElementById(
      "metrics"
    )
  );

const infoPanel =
  new InfoPanel(
    document.getElementById(
      "info-panel"
    )
  );

const complexityPanel =
  new ComplexityPanel(
    document.getElementById(
      "complexity-panel"
    )
  );

/*
|--------------------------------------------------------------------------
| Panels B
|--------------------------------------------------------------------------
*/

const complexityPanelB =
  new ComplexityPanel(
    document.getElementById(
      "complexity-panel-b"
    ),
    "-b"
  );

const metricsPanelB =
  new MetricsPanel(
    document.getElementById(
      "metrics-b"
    ),
    "-b"
  );

const infoPanelB =
  new InfoPanel(
    document.getElementById(
      "info-panel-b"
    ),
    "-b"
  );

infoPanelB.reset(
  "Waiting..."
);

/*
|--------------------------------------------------------------------------
| Trace Players A
|--------------------------------------------------------------------------
*/

const playerA =
  new TracePlayer(
    [],
    (step, index) => {
      visualizer.render(
        step,
        index
      );
    }
  );

const metricsPlayer =
  new TracePlayer(
    [],
    step => {
      metricsPanel.update(
        step
      );
    }
  );

const infoPlayer =
  new TracePlayer(
    [],
    step => {
      infoPanel.update(
        step
      );
    }
  );

/*
|--------------------------------------------------------------------------
| Comparison Mode
|--------------------------------------------------------------------------
*/

const comparisonMode =
  new ComparisonMode(
    controller,
    registry,
    (
      lengthA,
      lengthB
    ) => {
      const totalSteps =
        lengthB !== null
          ? Math.max(
              lengthA,
              lengthB
            )
          : lengthA;

      controller.setTotalSteps(
        totalSteps
      );
    },
    {
      complexityPanel:
        complexityPanelB,

      metricsPanel:
        metricsPanelB,

      infoPanel:
        infoPanelB
    }
  );

/*
|--------------------------------------------------------------------------
| Controller Wiring
|--------------------------------------------------------------------------
*/

controller.on(
  "step",
  index => {
    playerA.handleIndex(
      index
    );

    metricsPlayer.handleIndex(
      index
    );

    infoPlayer.handleIndex(
      index
    );
  }
);

const controlPanel =
  new ControlPanel(
    document.getElementById(
      "controls"
    ),
    controller
  );

controller.on(
  "tick",
  () => {
    controlPanel.update();
  }
);

/*
|--------------------------------------------------------------------------
| Dataset Loading
|--------------------------------------------------------------------------
*/

const datasetControls =
  new DatasetControls(
    document.getElementById(
      "dataset-controls"
    ),
    registry,
    (
      steps,
      algorithmEntry,
      dataset
    ) => {
      playerA.loadTrace(
        steps
      );

      metricsPlayer.loadTrace(
        steps
      );

      infoPlayer.loadTrace(
        steps
      );

      visualizer.loadTrace(
        steps
      );

      metricsPanel.reset();

      infoPanel.reset();

      complexityPanel.update(
        algorithmEntry
      );

      comparisonMode.notifyTraceA(
        dataset,
        steps
      );

      if (
        !comparisonMode.isActive
      ) {
        controller.setTotalSteps(
          steps.length
        );
      }

      controller.loadTrace();

      controlPanel.update();
    }
  );

/*
|--------------------------------------------------------------------------
| Compare Toggle
|--------------------------------------------------------------------------
*/

const compareButton =
  document.getElementById(
    "btn-toggle-comparison"
  );

compareButton.addEventListener(
  "click",
  () => {
    comparisonMode.toggle();

    compareButton.textContent =
      comparisonMode.isActive
        ? "Stop Compare"
        : "Compare";
  }
);

/*
|--------------------------------------------------------------------------
| View Switching
|--------------------------------------------------------------------------
*/

const barButton =
  document.getElementById(
    "btn-view-bar"
  );

const dotButton =
  document.getElementById(
    "btn-view-dot"
  );

function updateViewButtons(
  activeMode
) {
  barButton.classList.toggle(
    "active",
    activeMode === "bar"
  );

  dotButton.classList.toggle(
    "active",
    activeMode === "dot"
  );
}

barButton.addEventListener(
  "click",
  () => {
    visualizer.setView(
      "bar"
    );

    comparisonMode.setViewB(
      "bar"
    );

    updateViewButtons(
      "bar"
    );
  }
);

dotButton.addEventListener(
  "click",
  () => {
    visualizer.setView(
      "dot"
    );

    comparisonMode.setViewB(
      "dot"
    );

    updateViewButtons(
      "dot"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Initial UI State
|--------------------------------------------------------------------------
*/

updateViewButtons(
  "bar"
);

metricsPanel.reset();

metricsPanelB.reset();

infoPanel.reset();

infoPanelB.reset(
  "Waiting..."
);

complexityPanelB.reset();