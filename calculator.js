// Get the display
let display = document.getElementById("display");


// --------------------
// Add number/operator
// --------------------
function addValue(value) {
    display.value += value;
}


// --------------------
// Clear everything - AC
// --------------------
function clearDisplay() {
    display.value = "";
}


// --------------------
// Clear one character - C
// --------------------
function clearone() {
    display.value = display.value.slice(0, -1);
}


// --------------------
// Calculate answer - =
// --------------------
function calculate() {

    let expression = display.value;

    try {

        // Remove spaces
        expression = expression.replace(/\s+/g, "");

        // Automatically add * for cases like:
        // 7(2)   -> 7*(2)
        // 2(3+4) -> 2*(3+4)
        // (2)7   -> (2)*7
        // (2)(3) -> (2)*(3)

        expression = expression.replace(
            /(\d|\))(?=\()/g,
            "$1*"
        );

        expression = expression.replace(
            /(\))(?=\d)/g,
            "$1*"
        );

        // Convert percentage
        // 50% -> 50/100
        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        // Check for empty expression
        if (expression === "") {
            return;
        }

        // Check brackets
        let open = 0;

        for (let char of expression) {

            if (char === "(") {
                open++;
            }

            if (char === ")") {
                open--;

                if (open < 0) {
                    throw new Error("Wrong brackets");
                }
            }
        }

        if (open !== 0) {
            throw new Error("Wrong brackets");
        }

        // Calculate
        let result = eval(expression);

        // Check invalid result
        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        display.value = result;

    } catch (error) {

        display.value = "Error";

    }
}

      
       
