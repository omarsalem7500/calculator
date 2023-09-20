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

window.addEventListener('keydown', handleKeyboardInput)

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9){
        let value = e.key; 
         value.innerText = e.key; 

        appendNumber(value);
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
}

function addDecimal(){
    console.log(typeof(numA));
    if(!numA.includes(".") && numB === ""){
        screen.innerText += decimal.innerText;
        numA += decimal.innerText;
    }
    if(!numB.includes(".") && numB!= ""){
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

function addOperation(button){
     // stringA = number(screen.innerText);
    if(button.innerText){
        screen.innerText +=  button.innerText;
    }
    else{
        screen.innerText +=  button;
    }
     if(opString){
        numA = operate(opString, numA, numB);
        numA = numA.toString();
        if(numA === 'Oops'){
            alert("Oops");
            screen.innerText = '';
            numA = '';
            numB = '';
            opString = "";;
        }
        numB = '';
        if(button.innerText){
            opString =  button.innerText;
        }
        else{
            opString =  button;
        }
        //opString = button.innerText;
     }
     else{
        if(button.innerText){
            opString =  button.innerText;
        }
        else{
            opString =  button;
        }
    }
    
}

function equalsOp(){
      
   let final = operate(opString, numA, numB);
   final = final.toFixed(4);
   final = parseFloat(final);
   screen.innerText = final.toString(); 
   
} 

function appendNumber(button){
    
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
    
    //numB = '';
    a = Number(a);
    b = Number(b);
    if(operator === '+'){
        return add(a, b);
    }
    else if(operator === '—'){
        return subtract(a,b);
    }
    else if(operator === '✕'){
        return multiply(a,b)
    }
    else if(operator === '÷') {
        return divide(a,b);
    }
    else{
        return;
    }
    
}