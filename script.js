function display(data) {
    let content = `<tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>`;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        content += getProduct(data[i]);
    }
    document.getElementById("display1").innerHTML = content;
}
function getProduct(product) {
    return `<tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button onclick="showEditForm(${product.id})">Sửa</button></td>
            <td><button onclick="deleteProduct(${product.id})">Xóa</button></td>
        </tr>`
}

//hiển thị tất cả sản phẩm
function findAllProduct() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/products",
        success: function (data) {
            display(data)
        }, error: function (error) {
            console.log(error);
        }
    })
}
findAllProduct();

function showAddForm(){
            let str = "    <input placeholder='Name' type=\"text\" id=\"name\">\n" +
                "    <input placeholder='Price' type=\"text\" id=\"price\">\n" +
                "    <button onclick='save()'>Thêm</button>"
            document.getElementById("showFormAdd").innerHTML = str;
}

function save() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let pro = {

        name: name,
        price: price,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/products',
        data: JSON.stringify(pro),
        success: function () {
            findAllProduct()
        },
        error: function (error) {
            console.log(error)
        }
    })
}
function showEditForm(id){

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/products/" + id,
        success: function (data) {
                    let str = `    Name<input value="${data.name}" type=\"text\" id=\"name\">\n` +
                        `    Price<input type=\"number\" id=\"price\" value="${data.price}">\n` +
                        `    <button onclick='update(${data.id})'>Edit</button>`
                    document.getElementById("showFormEdit").innerHTML = str;
                }
            })
}
function update(id) {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let pro = {
        id: id,
        name: name,
        price: price,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/products/'+id,
        data: JSON.stringify(pro),
        success: function () {
            findAllProduct()
        },
        error: function (error) {
            console.log(error)
        }
    })
}
function deleteProduct(id){
    $.ajax({
        type: "DELETE",
        //tên API
        url: "http://localhost:8080/api/products/"+id,
        //xử lý khi thành công
        success: function () {
            findAllProduct()
        }

    });
}