import { cloneArray } from "../utils/arrayUtils.js";

export function quickSort(inputArray) {
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

  function partition(left, right) {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      accesses += 2;
      comparisons += 1;

      recordStep(
        "compare",
        [j, right],
        `Comparing ${arr[j]} at index ${j} with pivot ${pivot} at index ${right}`
      );

      if (arr[j] <= pivot) {
        i++;

        if (i !== j) {
          const leftValue = arr[i];
          const rightValue = arr[j];

          [arr[i], arr[j]] = [arr[j], arr[i]];

          accesses += 3;
          swaps += 1;

          recordStep(
            "swap",
            [i, j],
            `Swapped ${leftValue} at index ${i} with ${rightValue} at index ${j}`
          );
        }
      }
    }

    const pivotIndex = i + 1;

    if (pivotIndex !== right) {
      const pivotValue = arr[right];
      const displacedValue = arr[pivotIndex];

      [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

      accesses += 3;
      swaps += 1;

      recordStep(
        "swap",
        [pivotIndex, right],
        `Moved pivot ${pivotValue} to index ${pivotIndex}, swapping with ${displacedValue}`
      );
    }

    recordStep(
      "mark_sorted",
      [pivotIndex, pivotIndex],
      `Pivot ${arr[pivotIndex]} is in its final position at index ${pivotIndex}`
    );

    return pivotIndex;
  }

  function sort(left, right) {
    if (left >= right) {
      if (left === right) {
        recordStep(
          "mark_sorted",
          [left, left],
          `Element ${arr[left]} at index ${left} is in its final position`
        );
      }

      return;
    }

    const pivotIndex = partition(left, right);

    sort(left, pivotIndex - 1);
    sort(pivotIndex + 1, right);
  }

  if (arr.length > 0) {
    sort(0, arr.length - 1);
  }

  return steps;
}