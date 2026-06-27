// src/algorithms/radix.js

import { cloneArray } from "../utils/arrayUtils.js";

export function radixSort(inputArray) {
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

  const max = Math.max(...arr);

  function countingSortByDigit(exp) {
    const count = new Array(10).fill(0);
    const output = new Array(n);

    // Count digit frequencies
    for (let i = 0; i < n; i++) {
      const value = arr[i];
      const digit = Math.floor(value / exp) % 10;

      accesses += 1;

      recordStep(
        "compare",
        [i, i],
        `Reading digit ${digit} from ${value} at index ${i}`
      );

      count[digit]++;
    }

    // Accumulate counts
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Stable placement into output array (right to left)
    for (let i = n - 1; i >= 0; i--) {
      const value = arr[i];
      const digit = Math.floor(value / exp) % 10;

      const outputIndex = count[digit] - 1;

      output[outputIndex] = value;
      count[digit]--;

      accesses += 1;

      recordStep(
        "overwrite",
        [outputIndex, outputIndex],
        `Placing ${value} into output position ${outputIndex} using digit ${digit}`
      );
    }

    // Copy output back into working array
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];

      accesses += 1;

      recordStep(
        "overwrite",
        [i, i],
        `Copying ${output[i]} back to index ${i}`
      );
    }
  }

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(exp);
  }

  for (let i = 0; i < n; i++) {
    recordStep(
      "mark_sorted",
      [i, i],
      `Element ${arr[i]} at index ${i} is in its final sorted position`
    );
  }

  return steps;
}