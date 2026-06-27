import { COLORS } from "./rendererConstants.js";

export function computeSortedIndices(
  steps,
  currentIndex
) {
  const sorted = new Set();

  for (let i = 0; i <= currentIndex; i++) {
    const step = steps[i];

    if (step?.type === "mark_sorted") {
      for (const idx of step.indices ?? []) {
        sorted.add(idx);
      }
    }
  }

  return sorted;
}

export function getElementColor(
  step,
  index,
  sortedIndices
) {
  if (sortedIndices.has(index)) {
    return COLORS.sorted;
  }

  const activeIndices = step.indices ?? [];

  if (!activeIndices.includes(index)) {
    return COLORS.default;
  }

  switch (step.type) {
    case "compare":
      return COLORS.comparing;

    case "swap":
      return COLORS.swapping;

    case "overwrite":
      return COLORS.overwrite;

    case "mark_sorted":
      return COLORS.sorted;

    default:
      return COLORS.default;
  }
}