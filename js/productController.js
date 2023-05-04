
$(document).ready(function () {
    $('.filter-button-group button').click(function () {
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
    });
});

let getProductList = {};// Empty Object - Global Scope

fetch('json/updated_wellow.json')
    .then(response => response.json())// implied return
    .then(info => { // data will be the response as an object
        console.log(info); // Display the array info in the console

        getProductList = info;// store the data in the global variable

        
        
        var buttons = document.querySelectorAll('.filter-button-group button');
        // Set the first button's textContent to 'all'
        buttons[0].textContent = 'All';
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                displayProduct(info, this.value);
            });
        }

        // call the displayProduct function to display the data on the front-end
        displayProduct(info, "All");
    });


function displayProduct(info, category) {



    let details = "";

    // If "All" button is clicked, display all products
    if (category === 'All') {
        for (let i = 0; i < info.data.length; i++) {



            details +=
                `<div class="row justify-content-center mb-3 mobile-card">
                <div class="col-md-12 col-xl-10">
                    <div class="card shadow-0 border rounded-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                    <div class="bg-image hover-zoom ripple rounded ripple-surface mobile-image">
                                        <img src="${info.data[i].image_1}" class="w-75"/>
                                        <a href="#!">
                                            <div class="hover-overlay">
                                                <div class="mask"
                                                    style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-xl-6">
                                    <h5>${info.data[i].name}</h5>
                                   
                                    <div class="mt-1 mb-0 text-muted small">
                                        <span>${info.data[i].keyword.split(',')[0]?.trim()}</span>
                                        <span class="text-primary"> • </span>
                                        <span>${info.data[i].keyword.split(',')[1]?.trim()}</span>
                                        <span class="text-primary"> • </span>
                                        <span>${info.data[i].keyword.split(',')[2]?.trim()}<br /></span>
                                    </div>
                                    
                                    <p class="mb-2 mb-md-2">
                                    ${info.data[i].summary}
                                        
                                    </p>
                                    <button class="btn btn-primary btn-sm mb-5 mb-md-3" type="button" data-bs-toggle="modal" data-bs-target="#productModal" onClick="displayDetails(${i})" >Details</button>

                                </div>
                                <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                    <div class="d-flex flex-row align-items-center">
                                        <h4 class="mb-1 me-1">$${info.data[i].price}</h4>
                                        
                                    </div>
                                    
                                    <div class="d-flex flex-column mt-4">
                                        <h6 class="text">Quantity: (${info.data[i].item_unit})</h6>
                                        <input class="" type="number" id="stepper" name="stepper" value="1"
                                            min="1" max="100" step="1">
                                        <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                                            Add to shopping cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        //<a href="showUserDetail.html" onClick="displayDetails(${i})">



        document.querySelector("#products").innerHTML = details;
    } else {
        // Display products based on category
        for (var i = 0; i < info.data.length; i++) {
            var product = info.data[i];
            if (product.category === category) {
                details +=
                    `<div class="row justify-content-center mb-3 mobile-card">
                <div class="col-md-12 col-xl-10">
                    <div class="card shadow-0 border rounded-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                    <div class="bg-image hover-zoom ripple rounded ripple-surface mobile-image">
                                        <img src="${info.data[i].image_1}" class="w-75"/>
                                        <a href="#!">
                                            <div class="hover-overlay">
                                                <div class="mask"
                                                    style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-xl-6">
                                    <h5>${info.data[i].name}</h5>
                                   
                                    <div class="mt-1 mb-0 text-muted small">
                                        <span>${info.data[i].keyword.split(',')[0]?.trim()}</span>
                                        <span class="text-primary"> • </span>
                                        <span>${info.data[i].keyword.split(',')[1]?.trim()}</span>
                                        <span class="text-primary"> • </span>
                                        <span>${info.data[i].keyword.split(',')[2]?.trim()}<br /></span>
                                    </div>
                                    
                                    <p class="mb-2 mb-md-2">
                                    ${info.data[i].summary}
                                        
                                    </p>
                                    <button class="btn btn-primary btn-sm mb-5 mb-md-3" type="button" data-bs-toggle="modal" data-bs-target="#productModal" onClick="displayDetails(${i})" >Details</button>

                                </div>
                                <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                    <div class="d-flex flex-row align-items-center">
                                        <h4 class="mb-1 me-1">$${info.data[i].price}</h4>
                                        
                                    </div>
                                    
                                    <div class="d-flex flex-column mt-4">
                                        <h6 class="text">Quantity: (${info.data[i].item_unit})</h6>
                                        <input class="" type="number" id="stepper" name="stepper" value="1"
                                            min="1" max="100" step="1">
                                        <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                                            Add to shopping cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            }

        }
        document.querySelector("#products").innerHTML = details;
    }

}






function displayDetails(index) {
    //When user clicks on any "More" button, the details of the selected product will be displayed

    document.querySelector('#displayProduct').innerHTML = `
        <div class="modal-content rounded-4 shadow">
          <div class="modal-body p-5">
            <h2 class="fw-bold mb-2">${getProductList.data[index].name}</h2>

                <img src="${getProductList.data[index].image_1}" class="bi text-body-secondary flex-shrink-0" width="50%" height="50%">
                <div>
                  <div class="mt-1 mb-0 text-muted small">
                      <span>${getProductList.data[index].keyword.split(',')[0]?.trim()}</span>
                      <span class="text-primary"> • </span>
                      <span>${getProductList.data[index].keyword.split(',')[1]?.trim()}</span>
                      <span class="text-primary"> • </span>
                      <span>${getProductList.data[index].keyword.split(',')[2]?.trim()}<br /></span>
                  </div>
                  <h5 class="mb-0">Product Description:</h5>
                 
                  ${getProductList.data[index].description}
                </div>
              
            
                <div class="modal-footer">
                  <a class="btn btn-primary" data-bs-dismiss="modal">Close</a>
              </div>
          </div>
        </div>`;




}






