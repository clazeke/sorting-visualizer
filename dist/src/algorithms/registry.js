import { bubbleSort } from "./bubble.js";
import { insertionSort } from "./insertion.js";
import { selectionSort } from "./selection.js";
import { mergeSort } from "./merge.js";
import { quickSort } from "./quick.js";
import { heapSort } from "./heap.js";
import { shellSort } from "./shell.js";
import { countingSort } from "./counting.js";
import { radixSort } from "./radix.js";
import { cocktailSort } from "./cocktail.js";

export const registry = {
  bubble: {
    id: "bubble",
    name: "Bubble Sort",
    fn: bubbleSort,
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    stable: true,
    description:
      "Repeatedly compares adjacent elements and swaps them when out of order, causing larger values to bubble toward the end of the array."
  },

  insertion: {
    id: "insertion",
    name: "Insertion Sort",
    fn: insertionSort,
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    stable: true,
    description:
      "Builds a sorted portion one element at a time by inserting each new element into its correct position."
  },

  selection: {
    id: "selection",
    name: "Selection Sort",
    fn: selectionSort,
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    stable: false,
    description:
      "Repeatedly finds the minimum element from the unsorted portion and places it at the beginning."
  },

  merge: {
    id: "merge",
    name: "Merge Sort",
    fn: mergeSort,
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)"
    },
    stable: true,
    description:
      "Divides the array into progressively larger sorted sections and merges them using temporary storage. Merge sort is stable, guarantees O(n log n) performance, and uses overwrite operations rather than swaps."
  },

  quick: {
    id: "quick",
    name: "Quick Sort",
    fn: quickSort,
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)"
    },
    stable: false,
    description:
      "Partitions the array around a pivot, placing smaller values to the left and larger values to the right, then recursively sorts each partition."
  },

  heap: {
    id: "heap",
    name: "Heap Sort",
    fn: heapSort,
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)"
    },
    stable: false,
    description:
      "Builds a max-heap and repeatedly extracts the largest element by moving the heap root to the end of the unsorted region."
  },

  shell: {
    id: "shell",
    name: "Shell Sort",
    fn: shellSort,
    complexity: {
      best: "O(n log n)",
      average: "O(n log²n)",
      worst: "O(n log²n)",
      space: "O(1)"
    },
    stable: false,
    description:
      "Generalizes insertion sort by first sorting elements that are far apart using decreasing gap sizes, finishing with a final gap-1 insertion sort pass."
  },

  counting: {
    id: "counting",
    name: "Counting Sort",
    fn: countingSort,
    complexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
      space: "O(k)"
    },
    stable: true,
    description:
      "Counts occurrences of each value, computes their final positions, then places elements into a sorted output array without performing element-to-element comparisons."
  },

  radix: {
    id: "radix",
    name: "Radix Sort",
    fn: radixSort,
    complexity: {
      best: "O(nk)",
      average: "O(nk)",
      worst: "O(nk)",
      space: "O(n + k)"
    },
    stable: true,
    description:
      "Processes numbers digit by digit from least significant to most significant using a stable counting sort at each digit position. Radix sort performs no element-to-element comparisons."
  },

  cocktail: {
    id: "cocktail",
    name: "Cocktail Shaker Sort",
    fn: cocktailSort,
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    stable: true,
    description:
      "A bidirectional variation of bubble sort that alternates forward and backward passes, moving the largest values toward the end and the smallest values toward the beginning during each cycle."
  }
};