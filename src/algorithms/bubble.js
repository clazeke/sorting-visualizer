// src/algorithms/bubble.js

import { cloneArray } from "../utils/arrayUtils.js";

export function bubbleSort(inputArray) {
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

  const n = arr.length;

  if (n === 0) {
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      // Read arr[j] and arr[j + 1]
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [j, j + 1],
        `Comparing values at indices ${j} and ${j + 1}`
      );

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // 1 read + 2 writes
        accesses += 3;
        swaps += 1;
        swapped = true;

        recordStep(
          "swap",
          [j, j + 1],
          `Swapped values at indices ${j} and ${j + 1}`
        );
      }
    }

    recordStep(
      "mark_sorted",
      [n - 1 - i, n - 1 - i],
      `Element at index ${n - 1 - i} is in its final position`
    );

    if (!swapped) {
      // Remaining elements are already sorted.
      for (let k = n - 2 - i; k >= 0; k--) {
        recordStep(
          "mark_sorted",
          [k, k],
          `Element at index ${k} is in its final position`
        );
      }

      return steps;
    }
  }

  recordStep(
    "mark_sorted",
    [0, 0],
    "Element at index 0 is in its final position"
  );

  return steps;
}