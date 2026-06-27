import { cloneArray } from "../utils/arrayUtils.js";

export function selectionSort(inputArray) {
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
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [minIndex, j],
        `Comparing ${arr[minIndex]} at index ${minIndex} with ${arr[j]} at index ${j}`
      );

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const leftValue = arr[i];
      const minValue = arr[minIndex];

      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      accesses += 3;
      swaps += 1;

      recordStep(
        "swap",
        [i, minIndex],
        `Swapped ${leftValue} with minimum value ${minValue} to place it at index ${i}`
      );
    }

    recordStep(
      "mark_sorted",
      [i, i],
      `Element ${arr[i]} at index ${i} is in its final position`
    );
  }

  recordStep(
    "mark_sorted",
    [n - 1, n - 1],
    `Element ${arr[n - 1]} at index ${n - 1} is in its final position`
  );

  return steps;
}