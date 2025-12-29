function safeOp(a, b, op) {
  const num1 = toNumber(a), num2 = toNumber(b);
  if (num1 === undefined || num2 === undefined) return undefined;
  const result = op(num1, num2);
  if (!Number.isFinite(result)) return undefined;
  return result;
  }

function toNumber(value) {
  if (typeof value === "string") {
    if (value.trim() === "") return undefined;
    value = value.trim();
  }

  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

function formatForDisplay(value, decimalPlaces = 2) {
  if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
    throw new RangeError("decimalPlaces must be a non-negative integer");
  }

  const num = toNumber(value);

  if (num === undefined) {
    return undefined;
  }

  return num.toFixed(decimalPlaces); // string output for display
}

// Internal math primitives.
// ASSUMPTION: inputs are already validated numbers.
// These functions MUST ONLY be called via safeOp.
// Calling them directly with user input is a bug.
function _add(a, b) {
  return a + b;
}

function _subtract(a, b) {
  return a - b;
}

function _multiply(a, b) {
  return a * b;
}

function _divide(a, b) {
  return a / b;
}

export const ARITHMETIC = Object.freeze({
ADD: (a, b) => safeOp(a, b, _add),
SUBTRACT: (a, b) => safeOp(a, b, _subtract),
MULTIPLY: (a, b) => safeOp(a, b, _multiply),
DIVIDE: (a, b) => safeOp(a, b, _divide),
});
