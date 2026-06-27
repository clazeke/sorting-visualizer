// src/algorithms/cocktail.js

import { cloneArray } from "../utils/arrayUtils.js";

export function cocktailSort(inputArray) {
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

  let left = 0;
  let right = n - 1;

  while (left < right) {
    let swapped = false;

    // Forward pass — bubble largest value to the right boundary
    for (let i = left; i < right; i++) {
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [i, i + 1],
        `Comparing ${arr[i]} at index ${i} with ${arr[i + 1]} at index ${i + 1}`
      );

      if (arr[i] > arr[i + 1]) {
        const leftValue = arr[i];
        const rightValue = arr[i + 1];

        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        accesses += 3;
        swaps += 1;
        swapped = true;

        recordStep(
          "swap",
          [i, i + 1],
          `Swapped ${leftValue} at index ${i} with ${rightValue} at index ${i + 1}`
        );
      }
    }

    recordStep(
      "mark_sorted",
      [right, right],
      `Element ${arr[right]} at index ${right} is in its final position`
    );

    right--;

    if (!swapped) {
      for (let i = left; i <= right; i++) {
        recordStep(
          "mark_sorted",
          [i, i],
          `Element ${arr[i]} at index ${i} is in its final position`
        );
      }

      return steps;
    }

    swapped = false;

    // Backward pass — bubble smallest value to the left boundary
    for (let i = right; i > left; i--) {
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [i - 1, i],
        `Comparing ${arr[i - 1]} at index ${i - 1} with ${arr[i]} at index ${i}`
      );

      if (arr[i - 1] > arr[i]) {
        const leftValue = arr[i - 1];
        const rightValue = arr[i];

        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];

        accesses += 3;
        swaps += 1;
        swapped = true;

        recordStep(
          "swap",
          [i - 1, i],
          `Swapped ${leftValue} at index ${i - 1} with ${rightValue} at index ${i}`
        );
      }
    }

    recordStep(
      "mark_sorted",
      [left, left],
      `Element ${arr[left]} at index ${left} is in its final position`
    );

    left++;

    if (!swapped) {
      for (let i = left; i <= right; i++) {
        recordStep(
          "mark_sorted",
          [i, i],
          `Element ${arr[i]} at index ${i} is in its final position`
        );
      }

      return steps;
    }
  }

  if (left === right) {
    recordStep(
      "mark_sorted",
      [left, left],
      `Element ${arr[left]} at index ${left} is in its final position`
    );
  }

  return steps;
}