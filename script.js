const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const screen = document.getElementsByClassName("screen")[0];
const decimal = document.querySelector('#point');

//let screen.innerText = screen.innerText; 
screen.innerText = '';
let opString = '';
let numA = '';
let numB = '';
 final = "";

window.addEventListener('keydown', handleKeyboardInput)

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9){
        

        appendNumber(e.key);
    }
    if (e.key === '.') addDecimal()
    if (e.key === '=' || e.key === 'Enter') equalsOp()
    if (e.key === 'Backspace') delete_char()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      addOperation(convertOperator(e.key))
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '✕'
    if (keyboardOperator === '-') return '—'
    if (keyboardOperator === '+') return '+'
  }

 function clear(){
    screen.innerText = '';
    numA = '';
    numB = '';
    opString = "";
    final = "";
}

function addDecimal() {
    // if (numA && numB && opString && final) {
    //     clear();
    // }

    // Check if numA and numB are strings before using `includes` on them
    if (typeof numA === "string" && !numA.includes(".") && numB === "") {
        screen.innerText += decimal.innerText;
        numA += decimal.innerText;
    }
    
    const operations = ["+", "✕", "—", "÷"];
    if (typeof numB === "string" && !numB.includes(".") && operations.some(op => screen.innerText.includes(op))) {
        screen.innerText += decimal.innerText;
        numB += decimal.innerText;
    }
}
    


function delete_char(){
    screen.innerText = screen.innerText.slice(0, -1);

    if(opString){
        numB = numB.slice(0,-1)
    }
    else{
        numA = numA.slice(0,-1);
    }
}

function addOperation(button) {
    // Checking the type and properties of the button
    if (button && typeof button.innerText === "string") {
        screen.innerText += button.innerText;
    } else if (typeof button === "string") {
        screen.innerText += button;
    } else {
        console.error("Unexpected input to addOperation:", button);
        return;  // Exit the function early
    }

    if (opString) {
        let result = operate(opString, numA, numB);

        // Check result before assigning to numA
        if (typeof result !== "undefined") {
            numA = result.toString();
        } else {
            console.error("Operation result is undefined:", opString, numA, numB);
            clear();
            return; // Exit the function early
        }

        if (numA === 'Oops') {
            alert("Oops");
            clear();
            return; // Exit the function early
        }

        numB = '';
        opString = typeof button.innerText === "string" ? button.innerText : button;

    } else {
        opString = typeof button.innerText === "string" ? button.innerText : button;
    }
}

function equalsOp(){
    
        final = operate(opString, numA, numB);
            
        if (typeof final === "number") {
            final = final.toFixed(4);
            final = parseFloat(final);
        }
    
        screen.innerText = final.toString();
        
   
   
} 

function appendNumber(button){
    
    // if(numA && numB && opString && final){
    //     clear();
    // }
    if(button.innerText){
        screen.innerText +=  button.innerText;
    }
    else{
        screen.innerText +=  button;
    }
    console.log(button);
    if(opString === ""){
        
        if(button.innerText){
        numA +=  button.innerText;
        }
        else{
         numA +=  button;
        }
        //numA += button.innerText;
        
    }
    else{
       
            if(button.innerText){
            numB +=  button.innerText;
            }
            else{
             numB +=  button;
            }
    }
}

clearButton.addEventListener('click', () =>{
    clear();
})

decimal.addEventListener('click', () =>{
   addDecimal();
})

deleteButton.addEventListener('click', () =>{
   delete_char();

})


operationButtons.forEach(button => 
    button.addEventListener('click', () => addOperation(button)))
       
        
       

equalsButton.addEventListener('click', () =>{
    equalsOp();
  

})


numberButtons.forEach(button => 
    button.addEventListener('click', () => appendNumber(button)))
       
        
  

    
   
    





function add(a, b){
    
    console.log(a+b);
    return a + b; 
    
}

function subtract(a, b){
    
    console.log(a-b);
    return  a - b;  
   
}

function multiply(a, b){
    console.log(a*b);
    return  a * b; 
    
}   

function divide(a, b){
    console.log(a/b);
    if (b === 0) {
        
        return 'Oops';
        
      }
    return  a / b; 
    
}   


function operate(operator, a , b){
    
        a = Number(a);
        b = Number(b);
        
        switch(operator) {
            case '+':
                return add(a, b);
            case '—':
                return subtract(a, b);
            case '✕':
                return multiply(a, b);
            case '÷':
                if(b === 0) {
                    return 'Oops';
                }
                return divide(a, b);
            default:
                console.error("Unknown operator:", operator);  // Log for debugging
                return 0;  // Default return value if no match found
        
    }
}