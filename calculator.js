// Wait until HTML is completely loaded
window.onload = function () {

    // Get the display
    window.display = document.getElementById("display");

};


// Clear all
function clearDisplay() {
    document.getElementById("display").value = "";
}


// Clear one character
function clearone() {

    let display = document.getElementById("display");

    display.value = display.value.slice(0, -1);
}


// Calculate
function calculate() {

    let display = document.getElementById("display");

    let expression = display.value;

    try {

        // Remove spaces
        expression = expression.replace(/\s/g, "");

        // --------------------------------
        // Automatic multiplication
        // --------------------------------

        // 7(2) → 7*(2)
        expression = expression.replace(
            /(\d|\))\(/g,
            "$1*("
        );

        // (2)7 → (2)*7
        expression = expression.replace(
            /\)(\d)/g,
            ")*$1"
        );

        // (2)(3) → (2)*(3)
        expression = expression.replace(
            /\)\(/g,
            ")*("
        );


        // --------------------------------
        // Check brackets
        // --------------------------------

        let open = 0;

        for (let i = 0; i < expression.length; i++) {

            if (expression[i] === "(") {
                open++;
            }

            if (expression[i] === ")") {
                open--;

                if (open < 0) {
                    throw new Error();
                }
            }
        }

        if (open !== 0) {
            throw new Error();
        }


        // --------------------------------
        // Percentage
        // --------------------------------

        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        // --------------------------------
        // Calculate answer
        // --------------------------------

        let answer = eval(expression);


        // Check invalid answer
        if (!Number.isFinite(answer)) {
            throw new Error();
        }


        display.value = answer;

    }

    catch {

        display.value = "Error";

    }
};
