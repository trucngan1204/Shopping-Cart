let productsList = []
let carts = []

const fetchProduct = async () => {
    try {
        const res = await axios({
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "GET"
        });
        productsList = mapProduct(res.data)
        renderProducts(productsList);
    }
    catch (err) {
        console.log(err);
    }
}

const renderProducts = function (data) {
    data = data || ProductsList;
    var dataHTML = ""
    for (var i = 0; i < data.length; i++) {
        dataHTML += `
        
            <div class="col-4 ">
                <div class="card">
                    <img src=${data[i].img} class="card-img-top" width="100px" >
                    <div class="card-body">
                        <p>${data[i].desc}</p>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">    
                        <a type="button" href="#cart-shop"><button class="btn btn-success"  onclick="addToCarts(${data[i].id})" >Cart</button></a>
                    
                    </div>
                </div>
            </div>
 
    `
    }
    document.getElementById('porfolio').innerHTML = dataHTML;
}
const renderCarts = (data) => {
    data = data || carts
    let sum = 0
    for (var i = 0; i < data.length; i++) {
        sum += parseInt(data[i].price) * parseInt(data[i].quantity)
    }
    var dataHTML = "";
    for (var i = 0; i < data.length; i++) {
        dataHTML += `
        <tr>
            <th>
                <img src=${data[i].img} width="100px" height="100px">
            </th>
            <td>
            <p class="fs-5">${data[i].name}</p></td>
            <td>${data[i].price}</td>
            <td> <button id="btnDecrease" class='btn btn-success'
             onclick="handleQuantity(${data[i].id},${-1})"
            >-</button>
        <span>${data[i].quantity}</span>
        <button class='btn btn-success'onclick="handleQuantity(${data[i].id},${1})" >+</button></td>
            <td>${data[i].quantity * data[i].price}</td>
            <td><button class='btn btn-danger' onclick="handleDeleteCart(${data[i].id})" >Xóa</button></td>
    </tr>
    
 
    `
    }
    dataHTML += `
    <h1 class="text-right">Tổng tiền: ${sum}
        <button class="btn btn-success class="text-right" onclick="handlePay()">Thanh toán</button>
    </h1>
    `

    document.getElementById('cart').innerHTML = dataHTML;

}
const logic = (product) => {
    if (product.quantity === 1) {
        return true
    }
    return false
}
const mapProduct = (data) => {
    const results = data.map((item, i) => {
        return new Product(
            item.name,
            item.price,
            item.screen,
            item.backCamera,
            item.frontCamera,
            item.img,
            item.type,
            item.id,
            item.quantity,
            item.desc,
        )
    });
    return results;
}
//Search with samsung or iphone
const handleSearch = () => {
    const type = document.getElementById("type").value;

    let temp = productsList.filter((item) => {
        if (type === "All") {
            return item
        }
        return item.type === type
    })
    renderProducts(temp)
}

//Add a product into Cart
const addToCarts = (productId) => {
    const a = [...productsList]
    const index = carts.findIndex(
        (product) => product.id == productId
    )
    if (index === -1) {
        a.forEach((item) => {
            if (item.id == productId) {
                carts.push({ ...item, quantity: 1 });
            }
        })
    }
    else carts[index].quantity += 1


    renderCarts(carts)
    saveData()
}
const handlePay = () => {
    carts = [];

    renderCarts(carts)
    saveData()
}
const handleQuantity = (productId, typical) => {

    carts.forEach((item) => {

        if (productId == item.id && typical === -1 && parseInt(item.quantity) > 1) {
            item.quantity -= 1
        }
        else {
            if (productId == item.id && typical === -1 && parseInt(item.quantity) === 1) {
                handleDeleteCart(item.id);
            }
            if (productId == item.id && typical === 1) {
                item.quantity += 1
            }
        }
    })
    renderCarts(carts)
}
const handleDeleteCart = (productId) => {
    temp = carts.filter((item) => {
        return item.id != productId
    })
    carts = temp;

    renderCarts(carts)
    saveData()
}

// Save local storage:
const saveData = function () {
    var cartListJson = JSON.stringify(carts)
    localStorage.setItem("list", cartListJson);
}
const getData = function () {
    //Local storage: 

    var cartListJson = localStorage.getItem("list");
    if (cartListJson) {
        carts = mapData(JSON.parse(cartListJson));
        renderCarts(carts)
    }
}
var mapData = function (dataFromLocal) {
    var data = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
        var currentProduct = dataFromLocal[i];
        var mappedProduct = new Product(
            currentProduct.name,
            currentProduct.price,
            currentProduct.screen,
            currentProduct.backCamera,
            currentProduct.frontCamera,
            currentProduct.img,
            currentProduct.type,
            currentProduct.id,
            currentProduct.quantity,
            currentProduct.desc,
        )
        data.push(mappedProduct);
    }
    return data;
}
fetchProduct();
getData()