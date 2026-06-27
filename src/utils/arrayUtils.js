// src/utils/arrayUtils.js

export function generateRandom(size, min, max) {
  if (!Number.isInteger(size) || size < 0) {
    throw new Error("size must be a non-negative integer");
  }

  if (min > max) {
    throw new Error("min cannot be greater than max");
  }

  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Shallow clone only. Safe for flat arrays of primitives.
export function cloneArray(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  return [...arr];
}