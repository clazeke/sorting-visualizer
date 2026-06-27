import { cloneArray } from "../utils/arrayUtils.js";

export function mergeSort(inputArray) {
  const arr = cloneArray(inputArray);
  const steps = [];

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  function createStep(type, indices, description) {
    steps.push({
      type,
      indices,
      array: cloneArray(arr),
      meta: {
        comparisons,
        swaps,
        accesses,
        description,
      },
    });
  }

  function merge(left, mid, right) {
    const leftPart = arr.slice(left, mid);
    const rightPart = arr.slice(mid, right);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {
      comparisons += 1;
      accesses += 2;

      createStep(
        "compare",
        [left + i, mid + j],
        `Comparing ${leftPart[i]} and ${rightPart[j]}`
      );

      if (leftPart[i] <= rightPart[j]) {
        const value = leftPart[i];

        arr[k] = value;

        accesses += 2;

        createStep(
          "overwrite",
          [k],
          `Writing ${value} into position ${k}`
        );

        i += 1;
      } else {
        const value = rightPart[j];

        arr[k] = value;

        accesses += 2;

        createStep(
          "overwrite",
          [k],
          `Writing ${value} into position ${k}`
        );

        j += 1;
      }

      k += 1;
    }

    while (i < leftPart.length) {
      const value = leftPart[i];

      arr[k] = value;

      accesses += 2;

      createStep(
        "overwrite",
        [k],
        `Writing ${value} into position ${k}`
      );

      i += 1;
      k += 1;
    }

    while (j < rightPart.length) {
      const value = rightPart[j];

      arr[k] = value;

      accesses += 2;

      createStep(
        "overwrite",
        [k],
        `Writing ${value} into position ${k}`
      );

      j += 1;
      k += 1;
    }
  }

  const n = arr.length;

  for (let width = 1; width < n; width *= 2) {
    for (let left = 0; left < n; left += width * 2) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + width * 2, n);

      if (mid < right) {
        merge(left, mid, right);
      }
    }
  }

  for (let i = 0; i < n; i += 1) {
    createStep(
      "mark_sorted",
      [i],
      `${arr[i]} is now in its final sorted position`
    );
  }

  return steps;
}