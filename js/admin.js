var productsList =[];
var createProduct = function () {
    var name = document.getElementById('txtTenSP').value;
    var screen = document.getElementById('txtScreen').value;
    var backCamera = document.getElementById('txtBack').value;
    var frontCamera = document.getElementById('txtFront').value;
    var img = document.getElementById('txtImage').value;
    var type = document.getElementById('khSP').value;
    var id = document.getElementById('txtMaSP').value;
    var price = +document.getElementById('txtPrice').value;
    var quantity = +document.getElementById('txtQuantity').value;
    var desc = +document.getElementById('txtDesc').value;

    var newProduct = new ProductList(
        name, 
        price, 
        screen, 
        backCamera, 
        frontCamera, 
        img, 
        type, 
        id, 
        quantity, 
        desc
    );
    axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "POST",
            data: newProduct,
        }
    )
        .then(function (res) {
            getData();
        })
        .catch(function (err) {
            console.log(err);
        });
};
var deleteProduct = function (id) {
     axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
            method: "DELETE"
        }
    )
    .then(function (res) {
        console.log(res);
        getData();
      })
      .catch(function (err) {
        console.log(err);
      });
}
var getProduct = function (id) {
    axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
            method: "GET"
        }
    )
        .then(function(res) {
            var foundProduct = res.data;

            document.getElementById('txtTenSP').value = foundProduct.name;
            document.getElementById('txtScreen').value = foundProduct.screen;
            document.getElementById('txtBack').value = foundProduct.backCamera;
            document.getElementById('txtFront').value = foundProduct.frontCamera;
            document.getElementById('txtImage').value = foundProduct.img;
            document.getElementById('khSP').value = foundProduct.type;
            document.getElementById('txtMaSP').value = foundProduct.id;
            document.getElementById('txtPrice').value = foundProduct.price;
            document.getElementById('txtQuantity').value = foundProduct.quantity
            document.getElementById('txtDesc').value = foundProduct.desc

            document.getElementById('btnUpdate').style.display = "inline-block";

            document.getElementById('btnCreate').style.display = "none"
            document.getElementById('txtMaSP').disabled = true;
        })
        .catch(function(err) {
            console.log(err)
        })
}


var updateProduct = function () {
    var name = document.getElementById('txtTenSP').value;
    var screen = document.getElementById('txtScreen').value;
    var backCamera = document.getElementById('txtBack').value;
    var frontCamera = document.getElementById('txtFront').value;
    var img = document.getElementById('txtImage').value;
    var type = document.getElementById('khSP').value;
    var id = document.getElementById('txtMaSP').value;
    var price = +document.getElementById('txtPrice').value;
    var quantity = +document.getElementById('txtQuantity').value;
    var desc = document.getElementById('txtDesc').value;

    var updatedProduct = new ProductList(name, price, screen, backCamera, frontCamera, img, type, id, quantity, desc);
    axios(
        {
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
            method: "PUT",
            data: updatedProduct
        }
    )
        .then(function (res) {
            getData();
            document.getElementById("btnReset").click();
            document.getElementById('btnUpdate').style.display = "none";
            document.getElementById('btnCreate').style.display = "block";
            document.getElementById('txtMaSP').disabled = false;

        })
        .catch(function (err){
            console.log(err);
        })
}

var renderProducts = function(data){
    data = data ||productList;

    var dataHTML ="";
    for(var i =0; i<data.length; i++){
        dataHTML += `<tr>
        <td>${i+1}</td>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].screen}</th>
        <td>${data[i].backCamera}</td>
        <td>${data[i].frontCamera}</th>
        <td>${data[i].img}</th>
        <td>${data[i].desc}</th>
        <td>${data[i].type}</th>
        <td>${data[i].quantity}</th>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct('${
                data[i].id
                }')" >Xoá</button>
                <button class="btn btn-info" onclick="getProduct('${
                data[i].id
                }')">Cập nhật</button>
             </td>
        </tr>
        `       
            }
    document.getElementById("tbodySanPham").innerHTML = dataHTML;
}
var findById = function(id){
    for(var i=0; i<productList.length; i++){
        if(productList[i].id===id){
            return i;
        }
    }
    return -1;
};
var saveData = function(){
    var productListJSON = JSON.stringify(productList);
    localStorage.setItem("list",  productListJSON);
};
var getData = function(){
    const promise = axios({
        url:"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
        method: "GET",
    });

    promise.then(function(res){
        productList=mapData(res.data);
        renderProducts();
    }).catch(function(err){
        console.log(err);
    });
};
getData();
var mapData = function (dataFromLocal) {
    var data = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
      var currentProduct = dataFromLocal[i];
      var mappedProduct = new Product(
        currentProduct.name,
        currentProduct.id,
        currentProduct.price,
        currentProduct.screen,
        currentProduct.backCamera,
        currentProduct.frontCamera,
        currentProduct.img,
        currentProduct.desc,
        currentProduct.type,
        currentProduct.quantity
        
      );
  
      data.push(mappedProduct);
    }
  
    return data;
};
