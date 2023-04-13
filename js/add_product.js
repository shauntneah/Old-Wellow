"use strict"; //help browser to run in struct to eliminate some js silent errors by changing them to throw errors
function addProduct() {

    

    // the parameter will be sent in from another function through the arguments
    
    const pName = document.getElementById("pName").value;
    const pSum = document.getElementById("pSum").value;
    //const pCat = document.getElementById("pCat").value;
    const pImg = document.getElementById("pImg").value;
    const pPrice = document.getElementById("pPrice").value;
    const pStk = document.getElementById("pStk").value;

    const pUnit = document.getElementById("pUnit").value;
    // const pKey = document.getElementById("pKey").value;

    const pDesc = document.getElementById("pDesc").value;





    /*
     1) Construct/Create the object

    */

    const productItem = {
        id: 7,
        name: pName,
        imageURL: pImg,
        stock: pStk,
        unit: pUnit,
        price: pPrice,
        summary: pSum,
        description: pDesc

    }

    debugger

    fetch('../../json/data_wellow.json')
        // response is a holder(parameter) to retrieve the response from the server backend
        // response from the server include status code (eg. 200, 404, 500), header, data itself in JSON format(string)
        .then(response => response.json())  //implied return

        .then(info => {    // info parameter will be the response as an object
            // console.log(typeof (info));
            console.log(info);
            // console.log(info.data[0].email);




            info.push(productItem);
            // Store in local storage. will be in text-based
            localStorage.setItem("myProducts", JSON.stringify(info.data[6]));
            displayProduct(info);
        })







}