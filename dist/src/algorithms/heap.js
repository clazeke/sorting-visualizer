// src/algorithms/heap.js

import { cloneArray } from "../utils/arrayUtils.js";

export function heapSort(inputArray) {
  const arr = cloneArray(inputArray);
  const steps = [];

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  function recordStep(type, indices, description) {
    steps.push({
      type,
      indices,
      array: cloneArray(arr),
      meta: {
        comparisons,
        swaps,
        accesses,
        description
      }
    });
  }

  function heapify(heapSize, rootIndex) {
    let largest = rootIndex;

    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    if (left < heapSize) {
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [largest, left],
        `Comparing parent ${arr[largest]} at index ${largest} with left child ${arr[left]} at index ${left}`
      );

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [largest, right],
        `Comparing parent ${arr[largest]} at index ${largest} with right child ${arr[right]} at index ${right}`
      );

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIndex) {
      const rootValue = arr[rootIndex];
      const childValue = arr[largest];

      [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];

      accesses += 3;
      swaps += 1;

      recordStep(
        "swap",
        [rootIndex, largest],
        `Swapped parent ${rootValue} at index ${rootIndex} with child ${childValue} at index ${largest}`
      );

      heapify(heapSize, largest);
    }
  }

  const n = arr.length;

  if (n === 0) {
    return steps;
  }

  // Phase 1: Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Phase 2: Extract maximums
  for (let i = n - 1; i > 0; i--) {
    const rootValue = arr[0];
    const lastValue = arr[i];

    [arr[0], arr[i]] = [arr[i], arr[0]];

    accesses += 3;
    swaps += 1;

    recordStep(
      "swap",
      [0, i],
      `Moved maximum value ${rootValue} from root to index ${i}, swapping with ${lastValue}`
    );

    recordStep(
      "mark_sorted",
      [i, i],
      `Element ${arr[i]} at index ${i} is in its final sorted position`
    );

    heapify(i, 0);
  }

  recordStep(
    "mark_sorted",
    [0, 0],
    `Element ${arr[0]} at index 0 is in its final sorted position`
  );

  return steps;
}