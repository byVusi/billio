const ARITHMETIC = Object.freeze({
ADD: (a, b) => safeOp(a, b, _add),
SUBTRACT: (a, b) => safeOp(a, b, _subtract),
MULTIPLY: (a, b) => safeOp(a, b, _multiply),
DIVIDE: (a, b) => safeOp(a, b, _divide),
});

function calculateTipFromRate(bill, rate) {
  let rateAsDecimal = ARITHMETIC.DIVIDE(rate, 100);
  return ARITHMETIC.MULTIPLY(bill, rateAsDecimal);
}

function calculateTipFromFinal(bill, final) {
  if (final < bill) {
    throw new RangeError("Final value cannot be less than the bill value.");
  }

  return ARITHMETIC.SUBTRACT(final, bill);
}

function calculateFinal(bill, tip) {
 return ARITHMETIC.ADD(bill, tip)
}

function calculateSplit(final, divisor) {
return ARITHMETIC.DIVIDE(final, divisor);
}

/**
 * Safely performs a mathematical operation on two values.
 * Converts inputs to numbers, validates them, and ensures the result is finite.
 *
 * @param {*} a - First operand, can be number or string.
 * @param {*} b - Second operand, can be number or string.
 * @param {function(number, number): number} op - The operation function to apply.
 * @returns {number|undefined} - Result of operation, or undefined if inputs are invalid or result is not finite.
 */
function safeOp(a, b, op) {
  const num1 = toNumber(a), num2 = toNumber(b);
  if (num1 === undefined || num2 === undefined) return undefined;
  const result = op(num1, num2);
  if (!Number.isFinite(result)) return undefined;
  return result;
  }

/**
 * Converts a value to a number safely.
 *
 * @param {*} value - Value to convert.
 * @returns {number|undefined} - Converted number or undefined if conversion fails.
 */
function toNumber(value) {
  if (typeof value === "string") {
    if (value.trim() === "") return undefined;
    value = value.trim();
  }

  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

/**
 * Formats a number for display with a fixed number of decimal places.
 *
 * @param {*} value - Value to format (number or string).
 * @param {number} [decimalPlaces=2] - Number of decimal places (non-negative integer).
 * @returns {string|undefined} - Formatted string, or undefined if input is invalid.
 * @throws {RangeError} - If decimalPlaces is not a non-negative integer.
 */
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
/**
 * Internal addition operation. Assumes valid numeric inputs.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function _add(a, b) {
  return a + b;
}

/**
 * Internal subtraction operation. Assumes valid numeric inputs.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function _subtract(a, b) {
  return a - b;
}

/**
 * Internal multiplication operation. Assumes valid numeric inputs.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function _multiply(a, b) {
  return a * b;
}

/**
 * Internal division operation. Assumes valid numeric inputs.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function _divide(a, b) {
  return a / b; // Division by zero is handled in safeOp
}

/**
 * Utility module containing arithmetic operations and display formatting.
 */
export const UTILITIES = Object.freeze({
CALCULATE: Object.freeze({
TIP: Object.freeze({
FROM_RATE: calculateTipFromRate,
FROM_FINAL: calculateTipFromFinal
}),
FINAL: calculateFinal,
SPLIT: calculateSplit
}),
DISPLAY: Object.freeze({
  FORMAT: formatForDisplay
})
});
