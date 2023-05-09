//"use strict"; //help browser to run in struct to eliminate some js silent errors by changing them to throw errors
document.addEventListener('DOMContentLoaded', init, false);

$(document).on('click', '.pagination li', function () {
    $('.pagination li').removeClass('active');
    $(this).addClass('active');
  });

// admin product CRUD
const pageSize = 5;
let curPage = 1;

let sortCol;
let sortAsc = false;
let getAdminProductList = {};// Empty Object - Global Scope
async function init() {
    // Get the JSON data from the server
fetch('json/updated_wellow.json') // fetch the data from the server
    .then(adminResponse => adminResponse.json())// implied return. convert the response to json
    .then(adminInfo => { // data will be the response as an object
        //console.log(adminInfo); // Display the array info in the console

        getAdminProductList = adminInfo;// store the data in the global variable

   // hardcode data to test the add product function works     
// Add data to JSON file
const newProduct = [{
    "id": getAdminProductList.data.length + 1,
    "category": "Fruit",
    "keywords": "mushroom, antioxidants, medicinal, Indonesia",
    "name": "Apple",
    "image_1": "img/products/apple.png",
    "img_credit_1": "https://unsplash.com/photos/6Y1lH3h8B6w",
    "image_2": "img/products/apple2.png",
    "img_credit_2": "https://unsplash.com/photos/6Y1lH3h8B6w",
    "stock_count": 50,
    "item_unit": "kg",
    "price": 40,
    "summary": "Summary",   
    "description": "description"
},
{
"id": getAdminProductList.data.length + 1,
"category": "Fruit",
    "keywords": "mushroom, antioxidants, medicinal, Indonesia",
    "name": "Orange",
    "image_1": "img/products/orange.png",
    "img_credit_1": "https://unsplash.com/photos/6Y1lH3h8B6w",
    "image_2": "img/products/orange2.png",
    "img_credit_2": "https://unsplash.com/photos/6Y1lH3h8B6w",
    "stock_count": 40,
    "item_unit": "kg",
    "price": 40,
    "summary": "Summary",
    "description": "description"
    }
]
;

// concat method is used to add one array to another array
 getAdminProductList.data = getAdminProductList.data.concat(newProduct);


 // Add one new product to the getAdminProductList array
//getAdminProductList.data.push(newProduct);


        displayAdminProduct(getAdminProductList);// call the displayProduct function to display the data on the front-end
     
        console.log(getAdminProductList);
    
    });
   
}

document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);

function previousPage() {
    if(curPage > 1) curPage--;
    displayAdminProduct(getAdminProductList);
  }
  
  function nextPage() {
    if((curPage * pageSize) < adminInfo.length) curPage++;
    displayAdminProduct(getAdminProductList);
  }

//firstload(getAdminProductList);// call the firstload function to load the data from the server

// function displayAdminProduct(getAdminProductList) {

//     let admindetails = "";
//     console.log(getAdminProductList.data.length);

   

//     for (let i = 0; i < getAdminProductList.data.length; i++) {

//         admindetails += `<tr>
//             <td>
//                 <span class="custom-checkbox">
//                     <input type="checkbox" id="checkbox${i + 1}" name="options[]" value="1">
//                     <label for="checkbox${i + 1}"></label>
//                 </span>
//             </td>
//             <td>${getAdminProductList.data[i].name}</td>
//             <td><img src="${getAdminProductList.data[i].image_1}" class="w-50"/></td>
//             <td>${getAdminProductList.data[i].stock_count}</td>
//             <td>${getAdminProductList.data[i].item_unit}</td>
//             <td>$${getAdminProductList.data[i].price}</td>
//             <td>${getAdminProductList.data[i].summary}</td>
//             <td class="d-none">${getAdminProductList.data[i].description}</td>
//             <td>
//                 <a href="#editProductModal" class="edit" data-toggle="modal"><i class="material-icons"
//                         data-toggle="tooltip" title="Edit">&#xE254;</i></a>
//                 <a href="#deleteProductModal" class="delete" data-toggle="modal"><i
//                         class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
//             </td>
//         </tr>`
        
//     }

//     $(document).ready(function () {
//         // Activate tooltip
//         $('[data-toggle="tooltip"]').tooltip();

//         // Select/Deselect checkboxes
//         var checkbox = $('table tbody input[type="checkbox"]');
//         $("#selectAll").click(function () {
//             if (this.checked) {
//                 checkbox.each(function () {
//                     this.checked = true;
//                 });
//             } else {
//                 checkbox.each(function () {
//                     this.checked = false;
//                 });
//             }
//         });
//         checkbox.click(function () {
//             if (!this.checked) {
//                 $("#selectAll").prop("checked", false);
//             }
//         });
//     });

   

//     document.querySelector("#productRow").innerHTML = admindetails;

   

//       // listen for sort clicks
//   document.querySelectorAll('#sortProduct thead tr th').forEach(t => {
//     t.addEventListener('click', sort, false);
//  });
// }


// update with pagination
function displayAdminProduct(getAdminProductList, page) {
    curPage = page || curPage;

    let admindetails = "";
    let startIdx = (curPage - 1) * pageSize;
    let endIdx = startIdx + pageSize;
    let totalItems = getAdminProductList.data.length;

    for (let i = startIdx; i < endIdx && i < totalItems; i++) {
        admindetails += `<tr>
            <td>
                <span class="custom-checkbox">
                    <input type="checkbox" id="checkbox${i + 1}" name="options[]" value="1">
                    <label for="checkbox${i + 1}"></label>
                </span>
            </td>
            <td>${getAdminProductList.data[i].name}</td>
            <td><img src="${getAdminProductList.data[i].image_1}" class="w-50"/></td>
            <td>${getAdminProductList.data[i].stock_count}</td>
            <td>${getAdminProductList.data[i].item_unit}</td>
            <td>$${getAdminProductList.data[i].price}</td>
            <td>${getAdminProductList.data[i].summary}</td>
            <td class="d-none">${getAdminProductList.data[i].description}</td>
            <td>
                <a href="#editProductModal" class="edit" data-toggle="modal"><i class="material-icons"
                        data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteProductModal" class="delete" data-toggle="modal"><i
                        class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        </tr>`;
    }

    document.querySelector("#productRow").innerHTML = admindetails;

    // Update pagination information
    let totalPages = Math.ceil(totalItems / pageSize);
    let startItem = Math.min((curPage - 1) * pageSize + 1, totalItems);
    let endItem = Math.min(startItem + pageSize - 1, totalItems);
    document.querySelector("#startIdx").textContent = startItem;
    document.querySelector("#endIdx").textContent = endItem;
    document.querySelector("#totalItems").textContent = totalItems;
    
    // Disable previous/next buttons if necessary
    document.querySelector("#prevButton").classList.toggle("disabled", curPage === 1);
    document.querySelector("#nextButton").classList.toggle("disabled", curPage === totalPages);
    
    // Update pagination links
    let pageLinks = "";
    for (let i = 1; i <= totalPages; i++) {
        pageLinks += `<li class="page-item ${curPage === i ? 'active' : ''}"><a href="#" class="page-link" onclick="displayAdminProduct(getAdminProductList, ${i})">${i}</a></li>`;
    }
    document.querySelector(".pagination").innerHTML = pageLinks;
          // listen for sort clicks
  document.querySelectorAll('#sortProduct thead tr th').forEach(t => {
    t.addEventListener('click', sort, false);
 });
}


// sort the data by the selected column
function sort(e) {
    // let thisSort = e.target.dataset.sort;
    // if(sortCol === thisSort) sortAsc = !sortAsc;
    // sortCol = thisSort;
    // getAdminProductList.sort((a, b) => {
    //   if(a[sortCol] < b[sortCol]) return sortAsc?1:-1;
    //   if(a[sortCol] > b[sortCol]) return sortAsc?-1:1;
    //   return 0;
    // });
    // displayAdminProduct(getAdminProductList);

    let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  getAdminProductList.data.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? -1 : 1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? 1 : -1;
    return 0;
  });
  displayAdminProduct(getAdminProductList);
  }



function addProduct() {
    /* Requirenments:

    1) When the onclick event is triggered, the form data should be validated and if the data is valid, the data should be added to the JSON file and the table should be updated.

    2) The form should be validated using JavaScript. The following fields are required:
         
     const pName = document.getElementById("pName").value;
     const pSum = document.getElementById("pSum").value;
     const pCat = document.getElementById("pCat").value;
     const pImg = document.getElementById("pImg").value;
     const pPrice = document.getElementById("pPrice").value;
     const pStk = document.getElementById("pStk").value;
     const pUnit = document.getElementById("pUnit").value;
     const pKey = document.getElementById("pKey").value;
     const pDesc = document.getElementById("pDesc").value;

    3) The following fields should be validated:
        - Product Name: Only letters
        - Product Price: Only numbers and range between 1 and 10
        - Product Stock: Only numbers and range between 1 and 100
        - Product Unit: Only letters
        - Product Keywords: Only letters
        - Product Description: Only letters and character should be limited to 100
        - Product Summary: Only letters
        - Product Image: Only jpg or png image file

    4) If the data is not valid, the error message should be displayed in the form and the addProduct () function should be terminated.
       

    5) If the data is valid, the data should be added to the JSON file 'json/data_wellow.json' and the table should be updated.


    */
    // const fs = require('fs');
    const pName = document.getElementById("pName").value;
    const pSum = document.getElementById("pSum").value;
    const pCat = document.getElementById("pCat").value;
    const pImg = document.getElementById("pImg").value;
    const pPrice = document.getElementById("pPrice").value;
    const pStk = document.getElementById("pStk").value;
    const pUnit = document.getElementById("pUnit").value;
    const pKey = document.getElementById("pKey").value;
    const pDesc = document.getElementById("pDesc").value;
  
    debugger;
    // validation checks
    // const nameRegex = /^[A-Za-z\s]+$/;  // validate for letters and spaces
    // const priceRegex = /^[1-9]\d*(\.\d+)?$/; // validate for numbers and decimal
    // const stockRegex = /^([1-9]|[1-9]\d|100)$/; // validate for numbers and decimal
    // const unitRegex = /^[A-Za-z\s]+$/; // validate for letters and spaces
    // const keywordsRegex = /^[A-Za-z\s]+$/; // validate for letters and spaces
    // const descRegex = /^[A-Za-z\s]{0,100}$/; // validate for letters and spaces and max 100 characters
    // const sumRegex = /^[A-Za-z\s]+$/; // validate for letters and spaces
    // const imgRegex = /\.(jpg|png)$/; // validate for jpg or png image file

    let errorMsg = "";
    
    // if (!nameRegex.test(pName)) {
    //     errorMsg += "Product Name should contain only letters\n";
    // }
    // if (!priceRegex.test(pPrice)) {
    //     errorMsg += "Product Price should be a number between 1 and 10\n";
    // }
    // if (!stockRegex.test(pStk)) {
    //     errorMsg += "Product Stock should be a number between 1 and 100\n";
    // }
    // if (!unitRegex.test(pUnit)) {
    //     errorMsg += "Product Unit should contain only letters\n";
    // }
    // if (!keyRegex.test(pKey)) {
    //     errorMsg += "Product Keywords should contain only letters\n";
    // }
    // if (!descRegex.test(pDesc)) {
    //     errorMsg += "Product Description should contain only letters and be limited to 100 characters\n";
    // }
    // if (!imgRegex.test(pImg)) {
    //     errorMsg += "Product Image should be a .jpg or .png file\n";
    // }

    // if (errorMsg !== "") {
    //     alert(errorMsg);
    //     return;
    // }  
    // end of validation checks
  
    // Add data to JSON file
    const newProduct = {
        "id": getAdminProductList.data.length + 1,
        "name": pName,
        "summary": pSum,
        //"category": pCat,
        "imageURL": pImg,
        "price": parseFloat(pPrice),
        "stock": parseInt(pStk),
        "unit": pUnit,
       // "keywords": pKey.split(',').map((keyword) => keyword.trim()),
        "description": pDesc
    };
    
     // Add the new product to the getAdminProductList array
  getAdminProductList.data.push(newProduct);
  displayAdminProduct(getAdminProductList);

  // Write the updated array to the JSON file
//   const updatedData = JSON.stringify(getAdminProductList); // convert it back to json (text format)
//   fs.writeFile('json/data_wellow.json', updatedData, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });

//   // Update the table
//   displayAdminProduct(getAdminProductList);

//   // Reset the form
//   document.getElementById("addProductForm").reset();
}


// function addProduct() {



//     const pName = document.getElementById("pName").value;
//     const pSum = document.getElementById("pSum").value;
//     //const pCat = document.getElementById("pCat").value;
//     const pImg = document.getElementById("pImg").value;
//     const pPrice = document.getElementById("pPrice").value;
//     const pStk = document.getElementById("pStk").value;
//     const pUnit = document.getElementById("pUnit").value;
//     // const pKey = document.getElementById("pKey").value;
//     const pDesc = document.getElementById("pDesc").value;

    
//     var letters = /^[A-Za-z]+$/;
//     // Validate whether its a Numeric Input and range
//     if (isNaN(pPrice) || pPrice < 1 || pPrice > 10) {
//         document.getElementById("invalid-price").innerHTML = "Input not valid";
        
//     } else {

//         text = "Input OK";
//     }
//     // validation script to check whether the required field(s) in the HTML form contains only letters
//     if (pName.match(letters)) {

//     }
//     else {
//         document.getElementById("invalid-name").innerHTML = "Input not valid. Please enter only alphabets";
//     }
    
    



//     const productItem = {
//         id: 7,
//         name: pName,
//         imageURL: pImg,
//         stock: pStk,
//         unit: pUnit,
//         price: pPrice,
//         summary: pSum,
//         description: pDesc

//     }
//     debugger;


//     getAdminProductList.data.push(productItem); // add the new product to the data array

//     // localStorage.setItem("myProduct", JSON.stringify(getAdminProductList.data[index]))

//     // getAdminProductList = localStorage.getItem("myProduct");

//     // const convertUser = JSON.parse(getAdminProductList);
//     displayAdminProduct(getAdminProductList);// call the displayProduct function to display the data on the front-end



// }



//How to use fetch to POST form data as JSON to your API

// const exampleForm = document.getElementById("example-form");

// /**
//  * We'll define the `handleFormSubmit()` event handler function in the next step.
//  */
// exampleForm.addEventListener("submit", handleFormSubmit);

// /**
//  * Event handler for a form submit event.
//  *
//  * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
//  *
//  * @param {SubmitEvent} event
//  */
// async function handleFormSubmit(event) {
//     /**
//      * This prevents the default behaviour of the browser submitting
//      * the form so that we can handle things instead.
//      */
//     event.preventDefault();

//     /**
//      * This gets the element which the event handler was attached to.
//      *
//      * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
//      */
//     debugger;
//     const form = event.currentTarget;

//     /**
//      * This takes the API URL from the form's `action` attribute.
//      */
//     const url = form.action;

//     try {
//         /**
//          * This takes all the fields in the form and makes their values
//          * available through a `FormData` instance.
//          *
//          * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
//          */
//         const formData = new FormData(form);

//         /**
//          * We'll define the `postFormDataAsJson()` function in the next step.
//          */
//         const responseData = await postFormDataAsJson({ url, formData });

//         /**
//          * Normally you'd want to do something with the response data,
//          * but for this example we'll just log it to the console.
//          */
//         console.log({ responseData });

//     } catch (error) {
//         console.error(error);
//     }
// }

// /**
//  * Helper function for POSTing data as JSON with fetch.
//  *
//  * @param {Object} options
//  * @param {string} options.url - URL to POST data to
//  * @param {FormData} options.formData - `FormData` instance
//  * @return {Object} - Response body from URL that was POSTed to
//  */
// async function postFormDataAsJson({ url, formData }) {
//     /**
//      * We can't pass the `FormData` instance directly to `fetch`
//      * as that will cause it to automatically format the request
//      * body as "multipart" and set the `Content-Type` request header
//      * to `multipart/form-data`. We want to send the request body
//      * as JSON, so we're converting it to a plain object and then
//      * into a JSON string.
//      *
//      * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
//      * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
//      * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
//      */
//     const plainFormData = Object.fromEntries(formData.entries());
//     const formDataJsonString = JSON.stringify(plainFormData);

//     const fetchOptions = {
//         /**
//          * The default method for a request with fetch is GET,
//          * so we must tell it to use the POST HTTP method.
//          */
//         method: "POST",
//         /**
//          * These headers will be added to the request and tell
//          * the API that the request body is JSON and that we can
//          * accept JSON responses.
//          */
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         /**
//          * The body of our POST request is the JSON string that
//          * we created above.
//          */
//         body: formDataJsonString,
//     };

//     const response = await fetch(url, fetchOptions);

//     if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//     }

//     return response.json();
// }


// end of admin product CRUD