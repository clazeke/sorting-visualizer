# Sorting Algorithm Visualizer

An interactive desktop application for visualizing sorting algorithms in real time. Built with vanilla JavaScript and packaged as a native Windows application via Tauri.

---

## Features

### Algorithms
Nine sorting algorithms are implemented, covering every major category:

| Algorithm | Category | Time (Average) | Space | Stable |
|---|---|---|---|---|
| Bubble Sort | Exchange | O(n²) | O(1) | Yes |
| Cocktail Shaker Sort | Exchange | O(n²) | O(1) | Yes |
| Insertion Sort | Insertion | O(n²) | O(1) | Yes |
| Shell Sort | Insertion | O(n log²n) | O(1) | No |
| Selection Sort | Selection | O(n²) | O(1) | No |
| Merge Sort | Divide & Conquer | O(n log n) | O(n) | Yes |
| Quick Sort | Divide & Conquer | O(n log n) | O(log n) | No |
| Heap Sort | Selection | O(n log n) | O(1) | No |
| Counting Sort | Non-comparison | O(n + k) | O(k) | Yes |
| Radix Sort (LSD) | Non-comparison | O(nk) | O(n + k) | Yes |

### Visualization
- **Bar chart** and **dot/scatter** views — toggle between them at any time
- Color-coded operations:
  - 🟡 Yellow — comparison
  - 🔴 Red — swap
  - 🟢 Green — element in final sorted position
  - 🟣 Purple — overwrite (used by merge sort, shell sort, radix sort)

### Playback Controls
- Play / Pause / Step Forward / Step Backward / Reset
- Continuous speed slider + preset speed levels
- Step counter showing current position in the trace

### Dataset Controls
- Array size slider (5 to 100 elements)
- Random shuffle generation
- Manual custom input (comma-separated integers, 1–999)

### Metrics
- Live counters: Comparisons, Swaps, Array Accesses
- Big-O complexity panel per algorithm (Best / Average / Worst / Space / Stable)
- Step-by-step description of each operation

### Comparison Mode
- Side-by-side dual visualizer — run two algorithms on the same dataset simultaneously
- Independent metrics panels for each algorithm
- Independent algorithm selectors — mix any two algorithms
- Both sides stay in sync — same step index, same speed, same controls
- When one algorithm finishes before the other, it freezes on its final frame

### Themes
Five visual themes, cycle through them with the theme button:
- 🌑 Dark — terminal-inspired, high contrast
- ☀️ Light — clean and minimal
- 🌊 Ocean — deep navy with cyan accents
- 🌿 Forest — dark pine with amber
- 🌅 Sunset — deep violet with neon orange

---

## Running Locally (Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### Setup

```bash
git clone <your-repo-url>
cd sorting-visualizer
npm install
```

### Start the dev server

```bash
npx serve .
```

Open `http://localhost:3000` in your browser.

---

## Building the Desktop App

### Additional Prerequisites
- [Rust](https://rustup.rs/) (stable)
- Visual Studio C++ Build Tools (Desktop development with C++ workload)

### Build

```bash
npx tauri build
```

Output installers will be at:

```
src-tauri/target/release/bundle/msi/sorting-visualizer_0.1.0_x64_en-US.msi
src-tauri/target/release/bundle/nsis/sorting-visualizer_0.1.0_x64-setup.exe
```

The first build takes 10-15 minutes while Rust compiles dependencies. Subsequent builds are significantly faster.

### Distribution

The `.exe` installer is self-contained. Recipients need:
- Windows 10 or 11
- WebView2 runtime (pre-installed on Windows 11 and most updated Windows 10 machines)

No Node.js, browser, or development tools required on the target machine.

---

## Project Structure

```
sorting-visualizer/
├── dist/                        # Web assets served by Tauri
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   └── src/
│       ├── algorithms/          # Sorting algorithm implementations
│       │   ├── registry.js      # Algorithm catalog and metadata
│       │   ├── bubble.js
│       │   ├── cocktail.js
│       │   ├── counting.js
│       │   ├── heap.js
│       │   ├── insertion.js
│       │   ├── merge.js
│       │   ├── quick.js
│       │   ├── radix.js
│       │   ├── selection.js
│       │   └── shell.js
│       ├── engine/              # Playback and state management
│       │   ├── PlaybackController.js
│       │   └── TracePlayer.js
│       ├── ui/                  # UI components
│       │   ├── renderers/
│       │   │   ├── BarRenderer.js
│       │   │   ├── DotRenderer.js
│       │   │   ├── rendererConstants.js
│       │   │   └── rendererUtils.js
│       │   ├── ComparisonMode.js
│       │   ├── ComplexityPanel.js
│       │   ├── ControlPanel.js
│       │   ├── DatasetControls.js
│       │   ├── InfoPanel.js
│       │   ├── MetricsPanel.js
│       │   ├── ThemeManager.js
│       │   └── VisualizerComponent.js
│       ├── utils/
│       │   └── arrayUtils.js
│       └── main.js              # Composition root
├── src-tauri/                   # Tauri desktop wrapper
│   ├── src/
│   │   └── main.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── tests/
│   └── algorithms/
│       └── bubble.test.js
└── package.json
```

---

## Architecture

### Core Design Principle
Algorithms produce a **complete step trace** upfront. The engine replays that trace. Algorithms never drive animation directly — this is what makes step-backward possible.

### Step Trace Schema
Every algorithm emits steps of this shape:

```js
{
  type: "compare" | "swap" | "overwrite" | "mark_sorted",
  indices: [i, j],
  array: [...],   // full array state at this step
  meta: {
    comparisons: Number,
    swaps: Number,
    accesses: Number,
    description: String
  }
}
```

### Key Patterns
- **Observer pattern** — `PlaybackController` emits `"step"` and `"tick"` events, multiple consumers subscribe independently
- **Strategy pattern** — `BarRenderer` and `DotRenderer` are interchangeable behind a common interface
- **Derived state** — `sortedIndices` is recomputed from the trace on every render, enabling correct step-backward behavior
- **Trace-agnostic controller** — `PlaybackController` emits indices only; `TracePlayer` instances own their own traces and resolve steps independently

### Adding a New Algorithm
1. Create `src/algorithms/yourAlgorithm.js` — export a pure function that takes an array and returns a step trace
2. Add an entry to `src/algorithms/registry.js`

No changes to the engine, renderer, or any other system are required.

---

## Running Tests

```bash
npm run test:bubble
```

---

## License

MIT
