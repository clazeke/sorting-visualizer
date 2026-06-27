// src/algorithms/shell.js

import { cloneArray } from "../utils/arrayUtils.js";

export function shellSort(inputArray) {
  const arr = cloneArray(inputArray);
  const steps = [];

  let comparisons = 0;
  let swaps = 0; // remains 0 for Shell Sort (uses overwrites)
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

  // Build largest Knuth gap
  let h = 1;

  while (h < n / 3) {
    h = 3 * h + 1;
  }

  // Gap-reduction passes
  while (h >= 1) {
    for (let i = h; i < n; i++) {
      const key = arr[i];
      let j = i;

      while (j >= h) {
        accesses += 2;
        comparisons += 1;

        recordStep(
          "compare",
          [j - h, j],
          `Comparing ${arr[j - h]} with key ${key} (gap ${h})`
        );

        if (arr[j - h] <= key) {
          break;
        }

        const shiftedValue = arr[j - h];

        arr[j] = arr[j - h];

        accesses += 2; // 1 read + 1 write

        recordStep(
          "overwrite",
          [j - h, j],
          `Shifting ${shiftedValue} right from index ${j - h} to index ${j} (gap ${h})`
        );

        j -= h;
      }

      arr[j] = key;

      accesses += 1; // 1 write

      recordStep(
        "overwrite",
        [j, j],
        `Placing key ${key} at index ${j} (gap ${h})`
      );
    }

    h = Math.floor(h / 3);
  }

  for (let i = 0; i < n; i++) {
    recordStep(
      "mark_sorted",
      [i, i],
      `Element ${arr[i]} at index ${i} is in its final position`
    );
  }

  return steps;
}