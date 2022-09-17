// DOM elements
const resultEL = document.getElementById('result');
const lengthEL = document.getElementById('length');
const uppercaseEL = document.getElementById('uppercase');
const lowercaseEL = document.getElementById('lowercase');
const numbersEL = document.getElementById('numbers');
const symbolsEL = document.getElementById('symbols');
const generateEL = document.getElementById('generate');
const clipboadEL = document.getElementById('clipboard');


const randomFunc ={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
};

//clipboard
//this function was not yet been learned just for bonus :D

clipboadEL.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEL.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Passowrd is copied to clipboard');
})


//generate event listener

generateEL.addEventListener("click", () => {
    const length = Number(lengthEL.value);
    const hasLower = lowercaseEL.checked;
    const hasUpper = uppercaseEL.checked;
    const hasNumber = numbersEL.checked;
    const hasSymbol = symbolsEL.checked;

     resultEL.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol, length);
});


//generate pass function
function generatePassword(lower, upper, number, symbol, length){
    let generatePassword = '';

    const typesCount = lower + upper + number + symbol;
    
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0){
        return '';
    };

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatePassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatePassword.slice(0, length);

    return finalPassword;
}


// Generator functions
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

function getRandomSymbol(){
    const symbols = '!@#$%^&*()_+=-:;"/?><,.~`\'\\'
    return symbols[Math.floor(Math.random() * symbols.length)]
};