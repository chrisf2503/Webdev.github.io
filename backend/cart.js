// Cart data as a JS object instead of a Map for easier storage
let cart = loadCart();

function addToCart(nameSelector, priceSelector) {
    const item_name = document.querySelector(nameSelector).textContent;
    const item_price = parseFloat(document.querySelector(priceSelector).textContent.replace('$', ''));

    if (cart[item_name]) {
        cart[item_name].quantity++;
    } else {
        cart[item_name] = {
            price: item_price,
            quantity: 1
        };
    }

    saveCart();
    renderCart();
}

function removeItem(name) {
    if (cart[name].quantity <= 1) {
        delete cart[name];
    } else {
        cart[name].quantity--;
    }

    saveCart();
    renderCart();
}

function renderCart() {
    const table = document.querySelector('.shopping_cart');
    if (!table) return;

    table.innerHTML = `
        <tr class="outline">
            <th class="item_name">Name</th>
            <th class="item_price">Price</th>
            <th class="item_quantity">Quantity</th>
            <th class="buttons">Actions</th>
        </tr>
    `;

    for (let name in cart) {
        const { price, quantity } = cart[name];
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${name}</td>
            <td>$${price.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>
                <button onclick="removeItem('${name}')">Remove</button>
            </td>
        `;

        table.appendChild(row);
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || {};
}