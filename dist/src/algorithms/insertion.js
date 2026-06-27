import { cloneArray } from "../utils/arrayUtils.js";

export function insertionSort(inputArray) {
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

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0) {
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [j - 1, j],
        `Comparing ${arr[j - 1]} at index ${j - 1} with ${arr[j]} at index ${j}`
      );

      if (arr[j - 1] <= arr[j]) {
        break;
      }

      const movingValue = arr[j];
      
      const temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;

      accesses += 3;
      swaps += 1;

      recordStep(
        "swap",
        [j - 1, j],
        `Moving ${movingValue} left toward its insertion position`
      );

      j--;
    }
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