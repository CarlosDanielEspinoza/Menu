const search = document.querySelector("#search");
const category = document.querySelector("#category");
const btnSearch = document.querySelector("#buttonSearch");

let dataProducts;
fetch('products.json')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            dataProducts = data;
            return searchProduct();
        })
    .catch(e => console.log(e));
/////////////////////////////////////////////////////////////////////////////////////

function searchProduct(){
    removeProduct();
    let varSearch = search.value.toLowerCase();
    let varCategory = category.value;

    let countAll = 1;
    for(var i = 0; i < dataProducts.allProducts.length ;i++){

        let categoryProduct = dataProducts.allProducts[i].categoryProduct;
        let nameProduct = dataProducts.allProducts[i].name;
        let productName = dataProducts.allProducts[i].productName;
        let productPrice = dataProducts.allProducts[i].price;
        let imgSource = dataProducts.allProducts[i].srcImage;

        if(categoryProduct.indexOf(varCategory) !== -1){
            if(varSearch == ""){
                addProduct(imgSource,productName,productPrice);
            } else if(varSearch == nameProduct){
                addProduct(imgSource,productName,productPrice);
            }

        } else if(countAll == dataProducts.allProducts.length){
            for(var i = 0; i < dataProducts.allProducts.length ; i++){
                let productName = dataProducts.allProducts[i].productName;
                let productPrice = dataProducts.allProducts[i].price;
                let imgSource = dataProducts.allProducts[i].srcImage;
                let nameProduct = dataProducts.allProducts[i].name;

                if(varSearch == ""){
                    addProduct(imgSource,productName,productPrice);
                } else if(varSearch == nameProduct){
                    addProduct(imgSource,productName,productPrice);
                }
            }
            countAll = 0;

        } else {
            countAll = countAll+1;
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////
function addProduct(source,title,price){
    const container = document.querySelector("#contFlex");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const ttle = document.createElement("h3");
    const prices = document.createElement("p");
    
    div.setAttribute("class", "cont");
    img.setAttribute("class", "imgCont")
    ttle.setAttribute("class", "product");
    prices.setAttribute("class","price");

    img.setAttribute("src", source)
    ttle.textContent = title;
    prices.textContent = price;

    container.appendChild(div);
    div.appendChild(img);
    div.appendChild(ttle);
    div.appendChild(prices);
}

/////////////////////////////////////////////////////////////////////////////////////
function removeProduct(){
    const contain = document.getElementById("contFlex");
    while(contain.firstChild){
        contain.removeChild(contain.firstChild);
    }
}

//add event listeners after this
btnSearch.addEventListener('click',searchProduct);
search.addEventListener('keypress',function(e){
    if(e.code == "Enter"){
        searchProduct();
    }
});