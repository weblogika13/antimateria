function getJsonCookie(cookieName) {
    const allCookies = document.cookie.split('; ');
    const targetCookie = allCookies.find(row => row.startsWith(cookieName + '='));
    if (targetCookie) {
        const encodedData = targetCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(encodedData));
    }
    return null;
}
function saveJsonCookie(cookieName, data, seconds) {
    const jsonString = JSON.stringify(data);
    const safeString = encodeURIComponent(jsonString);
    document.cookie = `${cookieName}=${safeString}; max-age=${seconds}; path=/`;
}


let cart = [];
let products = [];

 const productList = document.querySelector('.product-list')

async function getProducts() {
    let response = await fetch("products.json")
    let products = await response.json()
    return products
}

function createProductCard(product) {
    return `
            <div class="card" style="width: 18rem;">
                <img src="img/${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.price}</p>
                    <a href="#" onclick="addToCard(${product.id})" class="btn btn-success">Купити</a>
                </div>
            </div>
        `
}

function loadCart() {
    const savedCart = getJsonCookie('cart');
    if (savedCart) {
        cart = savedCart;
        displayCart();
    }   
}

function addToCard (productId) {
    let product = products.find(p => p.id == productId)
    if (!product) return;

    let cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }


    saveJsonCookie('cart', cart, 3600*24); 
    console.log(cart);

    displayCart();
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
          <div class="cart-item">
                <h5>${item.title}</h5>
                <p>Ціна: ${item.price}</p>
                <p>Кількість: ${item.quantity}</p>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getProducts().then(productsData => {
        products = productsData
        productList.innerHTML = '';
        products.forEach(product => {
            productList.innerHTML += createProductCard(product)
        });
    })

 loadCart();

});