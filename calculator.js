

      
       
        
      
        let a = Number(prompt("Numbers count"));
        let num = [];
        let currentNumber = "";
         function press(value) {
            if (value >= '0' && value <= '9' || value === '.'){
                currentNumber = currentNumber + value;

                document.getElementById("display").value = calculator;
            }
             else{
                if (currentNumber !== ""){
                    numbers.push(Numbers(currentNumber));
                                  currentNumber = "";
                }
                 operators.push(value);

                 document.getElementById("display").value += value;

               
             }
         }

         function calculate(){
            if (currentNumber !== "" )
            {
                numbers.push(Number(currentNumber = ""));
            }
         }


       
        
        consol.log("Enter the numbers");

        for(let i = 0; i <= a-1; i = i + 1)
        {
             num[i] = Number(prompt(i + 1));
        }

        for( let i = 0; i <= a-1; i = i + 1)
        {
             consol.log(num[i]);
        }
        

           
       
         let c = "";
      
         let k = 0;
        

     
        

        
        for(let i = 0; i <= a-1; i = i + 1)
        {
        if( c === '+')
        {
             k = k + num[i];
        }
        else if( c === '-')
        {
             (k = k - num[i]);
        }
        }
        if (c === '+' || c === '-')
        {
        consol.log(k);
        }

        document.getElementById("display").value = k;
             
             numbers = [];
             operators = [];
             currentNumber = k.toString();
        
        function clearDisplay(){
            numbers = [];
            operators = [];
            currentNumbers = "";

            document.getElementById("display").value = "";
        }     
       
    
        let g = 1; 
        for(let i = 0; i <= a-1; i = i + 1)
        {
        if( c === '*')
        {
              g = g * num[i];
        } 
        
        else if( c == '/')
        {
            g =  num[i] / g;
        }
        else if( c == '%')
        {
            g =  num[i] % g;
        }
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
        
       
       
        
        
            

    
