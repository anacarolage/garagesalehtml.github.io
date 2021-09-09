/*  PROG1800 – Programming Dynamic Websites
    Assignment 03
    Professor: Dr Rohini Arora
    Student name: Ana Carolina Lage Muniz de Souza Campos
    Student number: 8709968 
    Revision History: Ana Carolina Lage, 2021.07.30, Created */


function addCart(btn) {
    var qtItem = parseInt(document.getElementById("quantity").value);

    document.getElementById(btn).innerText = "Added = x";
    document.getElementById(btn + "q").innerText = qtItem;

    switch (btn) {
        case "moose":
            mooseQt = qtItem;
            break;
        case "mug":
            mugQt = qtItem;
            break;
        case "blender":
            blenderQt = qtItem;
            break;
        case "bike":
            bikeQt = qtItem;
            break;
        case "pants":
            pantsQt = qtItem;
            break;
    }

    document.getElementsByName("totalItens")[0].value = parseInt(document.getElementsByName("totalItens")[0].value)
        + qtItem;

    document.getElementsByName("totalValue")[0].value = parseInt(document.getElementsByName("totalValue")[0].value)
        + (parseInt(document.getElementById(btn + "v").innerText) * qtItem);
}
