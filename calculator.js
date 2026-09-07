let display;

document.addEventListener('DOMContentLoaded', () => {
  display = document.getElementById('display');
});

// Clear everything
function clearDisplay() {
  display.value = '';
}

// Remove last character only
function clearone() {
  display.value = display.value.slice(0, -1);
}

// Insert a value at the current cursor position (so ( and ) go where you tap)
function insertAtCursor(value) {
  const start = display.selectionStart ?? display.value.length;
  const end = display.selectionEnd ?? display.value.length;
  const text = display.value;
  display.value = text.slice(0, start) + value + text.slice(end);
  const newPos = start + value.length;
  display.focus();
  display.setSelectionRange(newPos, newPos);
}

// Turn "70%" into "(70/100)" and "(5+2)%" into "((5+2)/100)".
// Walks backward from each % to find the full operand it applies to —
// either a parenthesized group or a plain number — and wraps it.
function convertPercent(expr) {
  let result = expr;
  let guard = 0;

  while (result.includes('%') && guard < 100) {
    guard++;
    const idx = result.indexOf('%');
    let start = idx - 1;

    if (result[start] === ')') {
      // Walk left to find the matching opening parenthesis
      let depth = 1;
      start--;
      while (start >= 0 && depth > 0) {
        if (result[start] === ')') depth++;
        if (result[start] === '(') depth--;
        if (depth > 0) start--;
      }
    } else {
      // Walk left across a plain number (digits and a decimal point)
      while (start >= 0 && /[0-9.]/.test(result[start])) start--;
      start++;
    }

    const operand = result.slice(start, idx);
    result = result.slice(0, start) + '(' + operand + '/100)' + result.slice(idx + 1);
  }

  return result;
}

// Evaluate the expression, including nested parentheses, in the correct
// mathematical order (parentheses first, then * /, then + -).
function calculate() {
  try {
    let expression = display.value.trim();

    if (expression === '') return;

    // % means "percent" here (70% -> 0.7), not JS's modulo operator
    expression = convertPercent(expression);

    // Allow implicit multiplication like "2(3+4)" or "(2+3)(4+5)" or "(2+3)4"
    expression = expression.replace(/(\d|\))\s*\(/g, '$1*(');
    expression = expression.replace(/\)\s*(\d)/g, ')*$1');

    // Only allow safe calculator characters (no % left at this point)
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      throw new Error('Invalid characters');
    }

    // Balanced-parentheses check for a clear error instead of a silent crash
    const opens = (expression.match(/\(/g) || []).length;
    const closes = (expression.match(/\)/g) || []).length;
    if (opens !== closes) {
      throw new Error('Unbalanced parentheses');
    }

    // The Function constructor lets JS's own parser handle precedence and
    // nested brackets correctly, without using eval() directly.
    const result = Function('"use strict"; return (' + expression + ')')();

    if (result === undefined || Number.isNaN(result) || !Number.isFinite(result)) {
      throw new Error('Invalid result');
    }

    // Round off tiny floating point errors (e.g. 0.1 + 0.2)
    display.value = Math.round(result * 1e10) / 1e10;
  } catch (e) {
    display.value = 'Error';
  }
}
