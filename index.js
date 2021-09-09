/*  PROG1800 – Programming Dynamic Websites
    Assignment 03
    Professor: Dr Rohini Arora
    Student name: Ana Carolina Lage Muniz de Souza Campos
    Student number: 8709968 
    Revision History: Ana Carolina Lage, 2021.07.30, Created */


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//setting up Express Validator
const {check, validationResult, checkSchema} = require('express-validator'); // ES6 standard for destructuring an object

// set up variables to use packages
var myApp = express();
myApp.use(bodyParser.urlencoded({extended:false}));

// set path to public folders and view folders
myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

//home page
myApp.get('/', function(req, res){
    res.render('form'); 
});

//defining regular expressions
var regExName = /^([A-Z][a-z]*)\s([A-Z][a-z ]*){1,}$/;
var regExNumber = /^[0-9]*$/;
var regExCreditCard = /^(\d{4}-\d{4}-\d{4}-\d{4})$/;


//function to check a value using regular expression
function checkRegex(userInput, regex){
    if(regex.test(userInput)){
        return true;
    }
    else{
        return false;
    }
}

// functions validations
function customNameValidation(value){
    if(!checkRegex(value, regExName)){
        throw new Error('Name should be in format First Last');
    }
    return true;
}

function customCreditCardNumberValidation(value){
    if(!checkRegex(value, regExCreditCard)){
        throw new Error('Credit card should be in the format xxxx-xxxx-xxxx-xxxx')
    }
    return true;
}


function customQuantityValidation(value){
    if(!checkRegex(value, regExNumber)){
        throw new Error('Please buy at least one item')
    }
    return true;
}

myApp.post('/', [
    check('name', 'Must have a name').not().isEmpty(),
    check('name').custom(customNameValidation),
    check('email', 'Must have email').isEmail(),
    check('creditCard').custom(customCreditCardNumberValidation),

],function(req, res){

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.render('form', {
            errors:errors.array()
        });
    }
    else{
        var name = req.body.name;
        var email = req.body.email;
        var creditCard = req.body.creditCard;
        var creditCardExpMonth = req.body.creditCardExpMonth;
        var customerCreditCardEncryped = creditCard.replace(/.(?=.{4})/g, '*');
        
        var totalItens = parseInt(req.body.totalItens);
        var totalValue = parseInt(req.body.totalValue);

        var tax = totalValue * 0.13;
        var total = totalValue + tax;

        var pageData = {
            name : name,
            email : email,
            customerCreditCardEncryped : customerCreditCardEncryped,
            creditCardExpMonth : creditCardExpMonth,
            totalItens : totalItens,
            totalValue : totalValue,
            tax : tax,
            total : total
        }
        res.render('form', pageData);
    }
});

// start the server and listen at a port
myApp.listen(8080);

//tell everything was ok
console.log('Everything executed fine.. website at port 8080....');


