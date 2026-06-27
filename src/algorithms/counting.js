// src/algorithms/counting.js

import { cloneArray } from "../utils/arrayUtils.js";

export function countingSort(inputArray) {
  const arr = cloneArray(inputArray);
  const steps = [];

  let comparisons = 0;
  let swaps = 0; // Counting Sort performs no swaps
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

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  const count = new Array(range).fill(0);
  const output = new Array(n);

  // Phase 1 — Count frequencies
  for (let i = 0; i < n; i++) {
    const value = arr[i];

    accesses += 1;

    recordStep(
      "compare",
      [i, i],
      `Counting occurrence of ${value} at index ${i}`
    );

    count[value - min]++;
  }

  // Phase 2 — Accumulate counts
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Phase 3 — Stable placement into output
  for (let i = n - 1; i >= 0; i--) {
    const value = arr[i];
    const outputIndex = count[value - min] - 1;

    output[outputIndex] = value;

    accesses += 1;

    recordStep(
      "overwrite",
      [i, outputIndex],
      `Placing ${value} into output position ${outputIndex}`
    );

    count[value - min]--;
  }

  // Phase 4 — Copy output back into working array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];

    accesses += 1;

    recordStep(
      "overwrite",
      [i, i],
      `Writing ${output[i]} back to index ${i}`
    );
  }

  // Final sorted markers
  for (let i = 0; i < n; i++) {
    recordStep(
      "mark_sorted",
      [i, i],
      `Element ${arr[i]} at index ${i} is in its final position`
    );
  }

  return steps;
}