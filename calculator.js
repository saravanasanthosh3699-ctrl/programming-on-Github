

      
       let numbers = [];
let operators = [];
let currentNumber = "";


function press(value) {

    // If the value is a number or decimal point
    if ((value >= "0" && value <= "9") || value === ".") {

        currentNumber += value;

        document.getElementById("display").value = currentNumber;
    }

    // If the value is an operator
    else {

        if (currentNumber !== "") {

            numbers.push(Number(currentNumber));
            currentNumber = "";
        }

        operators.push(value);

        document.getElementById("display").value += value;
    }
}


function calculate() {

    // Store the last number
    if (currentNumber !== "") {

        numbers.push(Number(currentNumber));
    }

    if (numbers.length === 0) {
        return;
    }


    // First calculate *, / and %
    for (let i = 0; i < operators.length; i++) {

        if (operators[i] === "*" ||
            operators[i] === "/" ||
            operators[i] === "%") {

            let result;

            if (operators[i] === "*") {
                result = numbers[i] * numbers[i + 1];
            }

            else if (operators[i] === "/") {
                result = numbers[i] / numbers[i + 1];
            }

            else if (operators[i] === "%") {
                result = numbers[i] % numbers[i + 1];
            }

            numbers[i] = result;

            numbers.splice(i + 1, 1);
            operators.splice(i, 1);

            i--;
        }
    }


    // Then calculate + and -
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {

        if (operators[i] === "+") {

            result = result + numbers[i + 1];
        }

        else if (operators[i] === "-") {

            result = result - numbers[i + 1];
        }
    }


    document.getElementById("display").value = result;


    // Store result for next calculation
    numbers = [];
    operators = [];
    currentNumber = result.toString();
}


function clearDisplay() {

    numbers = [];
    operators = [];
    currentNumber = "";

    document.getElementById("display").value = "";
}
        if (c == '*' || c == '/' || c == '%')
        {
        consol.log(g);
        }

         document.getElementById("display").value = g;
             
             numbers = [];
             operators = [];
             currentNumber = g.toString();
        
        function clearDisplay(){
            numbers = [];
            operators = [];
            currentNumbers = "";

            document.getElementById("display").value = "";
        }
        
       
       
        
        
            

    
