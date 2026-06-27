// tests/algorithms/bubble.test.js

import { bubbleSort } from "../../src/algorithms/bubble.js";
import { registry } from "../../src/algorithms/registry.js";

function arraysEqual(a, b) {
  return (
    a.length === b.length &&
    a.every((value, index) => value === b[index])
  );
}

const input = [5, 3, 1, 4, 2];
const original = [...input];

const steps = bubbleSort(input);

//
// Output is an array
//
console.assert(
  Array.isArray(steps),
  "bubbleSort should return an array"
);

//
// Input array not mutated
//
console.assert(
  arraysEqual(input, original),
  "bubbleSort should not mutate the input array"
);

//
// Trace contains steps
//
console.assert(
  steps.length > 0,
  "bubbleSort should generate at least one step"
);

//
// Final array is sorted
//
const finalArray = steps[steps.length - 1].array;

console.assert(
  arraysEqual(finalArray, [1, 2, 3, 4, 5]),
  "Final array should be sorted"
);

//
// Comparisons > 0 for n > 1
//
const lastMeta = steps[steps.length - 1].meta;

console.assert(
  lastMeta.comparisons > 0,
  "Comparisons should be greater than zero"
);

//
// Every step contains required fields
//
steps.forEach((step, index) => {
  console.assert(
    typeof step.type === "string",
    `Step ${index} missing type`
  );

  console.assert(
    Array.isArray(step.indices),
    `Step ${index} missing indices`
  );

  console.assert(
    Array.isArray(step.array),
    `Step ${index} missing array`
  );

  console.assert(
    typeof step.meta === "object" &&
      step.meta !== null,
    `Step ${index} missing meta`
  );

  console.assert(
    typeof step.meta.comparisons === "number",
    `Step ${index} missing comparisons`
  );

  console.assert(
    typeof step.meta.swaps === "number",
    `Step ${index} missing swaps`
  );

  console.assert(
    typeof step.meta.accesses === "number",
    `Step ${index} missing accesses`
  );

  console.assert(
    typeof step.meta.description === "string",
    `Step ${index} missing description`
  );
});

// Every step contains required fields
const firstStepArray = steps[0].array;
firstStepArray[0] = 9999;

console.assert(
  steps[1].array[0] !== 9999,
  "Step arrays must be independent snapshots, not shared references"
);

//
// Registry resolution
//
console.assert(
  registry.bubble.fn === bubbleSort,
  "Registry bubble entry should resolve to bubbleSort"
);

console.log("All bubble sort tests passed.");