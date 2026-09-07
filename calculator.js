const display = document.getElementById('display');

// Clear everything
function clearDisplay() {
  display.value = '';
}

// Remove the last character (backspace)
function clearone() {
  display.value = display.value.slice(0, -1);
}

// Evaluate the expression currently in the display
function calculate() {
  const expression = display.value.trim();

  if (!expression) return;

  try {
    // Basic safety check: only allow digits, operators, parentheses, dot, %, spaces
    if (/[^0-9+\-*/%().\s]/.test(expression)) {
      display.value = 'Error';
      return;
    }

    // Auto-balance any unclosed parentheses so expressions like "(2+3"
    // still evaluate instead of throwing
    const open = (expression.match(/\(/g) || []).length;
    const close = (expression.match(/\)/g) || []).length;
    const balanced = expression + ')'.repeat(Math.max(0, open - close));

    // Using Function instead of eval keeps this out of the local scope,
    // while still correctly respecting parentheses and operator precedence
    // (so nested/inner operations resolve before outer ones, and vice versa).
    const result = Function('"use strict"; return (' + balanced + ')')();

    if (result === undefined || Number.isNaN(result) || !Number.isFinite(result)) {
      display.value = 'Error';
    } else {
      // Round off floating point noise, e.g. 0.1 + 0.2
      display.value = Math.round(result * 1e10) / 1e10;
    }
  } catch (err) {
    display.value = 'Error';
  }
}

// Optional: let the keyboard work too (Enter to calculate, Backspace to delete)
display.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  }
});

};
