const socket = io();

const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (event) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        color: '#11191f',
        background: 'white',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
    });
    event.preventDefault();
    const title = document.getElementById("titleId");
    const description = document.getElementById("descriptionId");
    const price = document.getElementById("priceId");
    const code = document.getElementById("codeId");
    const stock = document.getElementById("stockId");
    const prod = {
        "title": title.value,
        "description": description.value,
        "price": price.value,
        "code": code.value,
        "stock": stock.value
    };
    if (isNaN(parseInt(price.value)) || isNaN(parseInt(stock.value))) {
        Toast.fire({
            icon: 'error',
            iconColor: '#af0707',
            title: `Datos ingresados no válidos (Precio o Stock)⛔`,
        });
    } else {
        const url = `http://localhost:8080/api/productByCode/${prod.code}`;
        const response = await fetch(url);
        if (response.status === 500) {
            socket.emit("product", prod);
            title.value = "";
            description.value = "";
            price.value = "";
            code.value = "";
            stock.value = "";
            Toast.fire({
                icon: 'success',
                iconColor: '#1cc738',
                title: `Producto "${prod.title}" agregado exitosamente en la DB✅`,
            });
        } else {
            Toast.fire({
                icon: 'error',
                iconColor: '#af0707',
                title: `Producto "${prod.title}" ya existente en la DB⛔`,
            });
        }
    }
});

socket.on("products", async (products) => {
    const productList = document.getElementById("product-list");
    productList.innerText = "";
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productList.appendChild(productDiv);
        const title = document.createElement("p");
        title.innerText = `Nombre: ${product.title}`;
        productDiv.appendChild(title);
        const description = document.createElement("p");
        description.innerText = `Descripción: ${product.description}`;
        productDiv.appendChild(description);
        const price = document.createElement("p");
        price.innerText = `Precio: $${product.price}`;
        productDiv.appendChild(price);
        const code = document.createElement("p");
        code.innerText = `Código: ${product.code}`;
        productDiv.appendChild(code);
        const stock = document.createElement("p");
        stock.innerText = `Stock: ${product.stock}`;
        productList.appendChild(stock);
        productList.appendChild(document.createElement("hr"));
    });
});