let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById('cart-list');
    let totalElement = document.getElementById('cart-total');

    if (cartList && totalElement) {
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            let li = document.createElement('li');
            li.innerText = `${item.product} - $${item.price}`;
            cartList.appendChild(li);
            total += item.price;
        });

        totalElement.innerText = total.toFixed(2);
    }
}

document.getElementById('categoryFilter')?.addEventListener('change', function() {
    let selectedCategory = this.value;
    let products = document.querySelectorAll('.product');

    products.forEach(product => {
        if (selectedCategory === "all" || product.getAttribute('data-category') === selectedCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
