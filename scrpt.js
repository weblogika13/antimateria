
document.addEventListener("DOMContentLoaded", () => {

let cart = [];
let products = [];


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
                    <a href="#" onclick="addTocard($(product)" class="btn btn-primary">Купити</a>
                </div>
            </div>
        `
    }

    getProducts().then(products => {
        products = productsData
        const productList = document.querySelector('.product-list')
        productList.innerHTML = '';
        products.forEach(product => {
            productList.innerHTML += createProductCard(product)
        });
    })

    function addTocart(product){
let product = products.find(p.id == productId)
if (!product) return;

let cartItem = cart.find(item -> item.id == productId);
if (cartItem) {
    cartItem.quan
}
    }
});