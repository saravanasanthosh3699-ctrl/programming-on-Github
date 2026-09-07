

      
       function clearDisplay() {
    document.getElementById("display").value = "";
}

function clearOne() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function appendValue(value) {
    document.getElementById("display").value += value;
}

function calculate() {
    let display = document.getElementById("display");
    let expression = display.value;

    try {
        // 7(2) → 7*(2)
        expression = expression.replace(/(\d|\))\(/g, "$1*(");

        // (2)7 → (2)*7
        expression = expression.replace(/\)(\d)/g, ")*$1");

        let result = eval(expression);

        display.value = result;
    }
    catch (error) {
        display.value = "Error";
    }
}
