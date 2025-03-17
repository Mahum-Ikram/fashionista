let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price) {
    let existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }

    saveCart();
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    let totalElement = document.getElementById('cart-total');

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        let row = document.createElement('tr');
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.product}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeFromCart(${index})">X</button></td>
        `;

        cartItems.appendChild(row);
    });

    totalElement.innerText = total.toFixed(2);
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", updateCart);
