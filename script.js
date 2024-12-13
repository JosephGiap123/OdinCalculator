let num1 = '';
let num2 = '';
let operation = '';
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
	return a/b;
}

function modulus(a,b){
	return a%b;

}

function roundNumber(num){
	return parseInt(num.toFixed(4));
}

function addNum(value){
	if(num1 === "Error"){
		num1 = '';
	}
	if(operation){
		num2 += value;
	}
	else{
		num1 += value;
	}
	renderDisplay();
}

function addOperation(value){
	if(num1 === "Error"){
		num1 = '';
	}
	if(operation){
		//calculate, add the operation after
		if(num2){
			calculate();
		}
		operation = value;
	}
	else{
		operation = value;
	}
	renderDisplay();
}

function calculate(){
	let result;
	const number1 = Number(num1);
	const number2 = Number(num2);
	switch(operation){
		case '*':
			num1 = parseFloat(multiply(number1, number2).toFixed(4));
			break;
		case '+':
			num1 = parseFloat(add(number1, number2).toFixed(4));
			break;
		case '-':
			num1 = parseFloat(subtract(number1, number2).toFixed(4));
			break;
		case '/':
			if(number2 === 0){
				num1 = "Error";
				num2 = '';
				operation = '';
				renderDisplay();
				return;
			}
			num1 = parseFloat(divide(number1, number2).toFixed(4));
			break;
		case '%':
			if(number2 === 0){
				num1 = "Error";
				num2 = '';
				operation = '';
				renderDisplay();
				return;
			}
			num1 = parseFloat(modulus(number1, number2).toFixed(4));
			break;
		default:
			break;
	}
	num1 = num1.toString();
	num2 = '';
	operation = '';
	renderDisplay();
}

function addDecimal(){
	if(num1 === "Error"){
		num1 = '';
	}
	if(operation){
		if(!num2.includes('.')){
			num2 += '.';
		}
	}
	else{
		if(!num1.includes('.')){
			num1 += '.';
		}
	}
	renderDisplay();
}

document.querySelectorAll('.js-num').forEach((button)=>{
	button.addEventListener('click', ()=>{
		addNum(button.textContent);
	});
});

document.querySelectorAll('.js-op').forEach((button)=>{
	button.addEventListener('click', ()=>{
		addOperation(button.textContent);
	});
});

document.querySelector('.js-clear').addEventListener('click', ()=>{
	num1 = '';
	num2 = '';
	operation = '';
	renderDisplay();
});

document.querySelector('.js-dec').addEventListener('click', ()=>{
	addDecimal();
});

document.querySelector('.js-enter').addEventListener('click', ()=>{
	calculate();
});

function renderDisplay(){
	document.querySelector('.js-display').textContent = num1 + operation + num2;
}

document.querySelector('.js-invert').addEventListener(('click'), ()=>{
	if(operation){
		if(num2.includes('-')){ //if second number is negative
			num2 = num2.slice(1);
		}
		else{
			num2 = '-' + num2;
		}
	}
	else{
		if(num1.includes('-')){
			num1 = num1.slice(1);
		}
		else{
			num1 = '-' + num1;
		}
	}
	renderDisplay();
});

document.querySelector('body').addEventListener('keydown', (event)=>{
	if(event.key.match(/[0-9]/)){
		addNum(event.key);
		return;
	}
	if(event.key.match(/[+\-%*/]/)){
		addOperation(event.key);
		return;
	}
	if(event.key === "Enter"){
		calculate();
		return;
	}
	if(event.key==="Backspace"){
		if(num2){
			num2 = num2.slice(0, -1);
		}
		else if(operation){
			operation = '';
		}
		else if(num1){
			num1 = num1.slice(0,-1);
		}
		renderDisplay();
		return;
	}
	if(event.key === "."){
		addDecimal();
	}
});