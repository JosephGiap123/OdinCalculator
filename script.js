let display = '';
function add(a,b){
	return a+b;
}

function subtract(a,b){
	return a-b;
}

function multiply(a,b){
	return a*b;
}

function divide(a,b){
	return (b != 0) ? a/b : "Error";
}

function modulus(a,b){
	return (b != 0) ? a%b : "Error";

}

function roundNumber(num){
	return parseInt(num.toFixed(4));
}

function addNumToDisplay(value){
	display += value;
	displayToCalculator();
}

function addOperationToDisplay(value){
	if(display.match(/(?<!^|[+\-*/%])[+\-*/%](?=[^+\-*/%]*$)/) || display === ''){
		//run the function to calculate the display.
		calculate();
	}
	else{
		display += value;
	}
	displayToCalculator();
}

function calculate(){
	const operator = /(?<!^|[+\-*/%])[+\-*/%](?=[^+\-*/%]*$)/.exec(display)[0]; //extracts operator, allows for negative numbers

	console.table(operator);
	let numberArray = display.split(/(?<!^|[+\-*/%])[+\-*/%](?=[^+\-*/%]*$)/).filter(num=> num !== ''); // extract numbers, filters out empty string in case of something like '9/ enter'

	console.log(numberArray);

	numberArray.map((num, index)=>  numberArray[index] = Number(num));

	console.table(numberArray);
	if(operator && (numberArray[1] || numberArray[1] === 0)){
		switch(operator){
			case '*':
				display = multiply(numberArray[0], numberArray[1]);
				break;
			case '/':
				display = divide(numberArray[0], numberArray[1]);
				break;
			case '-':
				display = subtract(numberArray[0], numberArray[1]);
				break;
			case '+':
				display = add(numberArray[0], numberArray[1]);
				break;
			case '%':
				display = modulus(numberArray[0], numberArray[1]);
				break;
			default:
				break;
		};
		display = display.toString();
	}
	displayToCalculator();
};

function addDecimal(){
	let numberArray = display.split(/(?<!^|[+\-*/%])[+\-*/%](?=[^+\-*/%]*$)/);
	if(numberArray[numberArray.length-1].includes('.')){
		//do nothing, has a decimal place already.
	}
	else{
		display += '.';
		displayToCalculator();
	}
}

document.querySelectorAll('.js-num').forEach((button)=>{
	button.addEventListener('click', ()=>{
		if(display === "Error"){
			display = '';
		}
		addNumToDisplay(button.textContent)
	});
});

document.querySelectorAll('.js-op').forEach((button)=>{
	button.addEventListener('click', ()=>{
		if(display === "Error"){
			display = '';
		}
		addOperationToDisplay(button.textContent)
		}
	);
});

document.querySelector('.js-clear').addEventListener('click', ()=>{
	display = '';
	displayToCalculator();
});

document.querySelector('.js-dec').addEventListener('click', ()=>{
	if(display === "Error"){
		display = '';
	}
	addDecimal();
});

document.querySelector('.js-enter').addEventListener('click', ()=>{
	if(display === "Error"){
		display = '';
	}
	calculate();
});

function displayToCalculator(){
	document.querySelector('.js-display').textContent = display;
}

document.querySelector('.js-invert').addEventListener(('click'), ()=>{
	const operatorMatch = /(?<!^|[+\-*/%])[+\-*/%](?=[^+\-*/%]*$)/.exec(display);  //returns array, array can be null.
	const operator = operatorMatch ? operatorMatch[0] : '';
	let numberArray = display.split(/(?<!^|[+\-*/%])[+\-*/%](?=[^+\-*/%]*$)/);

	
	let lastNumber = numberArray[numberArray.length-1]
	if(lastNumber.includes('-')){
		//has a negative already, you must delete this!
		lastNumber = lastNumber.slice(1);
	}
	else{
		lastNumber = '-' + lastNumber;
	}
	console.log(lastNumber);
	if(operator){
		//if there is an operator, then it suggests that there is another number. (check done earlier to confirm that it exists)
		display = numberArray[0] + operator + lastNumber;	
	}
	else{
		display = lastNumber;
		//if no operator, there is just one number, which means we can just equal it to the inverted number.
	}
	displayToCalculator();
});

document.querySelector('body').addEventListener('keydown', (event)=>{
	if(event.key.match(/[1234567890]/)){
		addNumToDisplay(event.key);
		return;
	}
	if(event.key === "Enter"){
		if(display === "Error"){
			display = '';
		}
		calculate();
		return;
	}
	if(event.key.match(/[+\-*/%]/)){
		addOperationToDisplay(event.key);
		return;
	}
	if(event.key === "Backspace"){
		display = display.slice(0, -1);
		displayToCalculator();
	}
	if(event.key === "."){
		if(display === "Error"){
			display = '';
		}
		addDecimal();
	}
})