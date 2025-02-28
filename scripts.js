let totalPrice = 0;

function AddToCart(productName, productPrice, button) {
    ChangeButtonTextOnClick(button);
    const cart = document.getElementById('cart');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span>${productName}</span>
        <div class="d-flex align-items-center">
            <span class="badge bg-primary me-2">${productPrice} kr</span>
            <span class="text-danger remove-button" style="cursor: pointer;">&#10005;</span>
        </div>
    `;
    cart.appendChild(li);

    totalPrice += parseFloat(productPrice);
    document.getElementById('totalPrice').textContent = `Total Price: ${totalPrice} kr`;

    SaveCartToLocalStorage();
    AttachRemoveEvent(li.querySelector('.remove-button'), productPrice);
}

function RemoveFromCart(element, productPrice) {
    element.parentElement.parentElement.remove();
    totalPrice -= parseFloat(productPrice);
    document.getElementById('totalPrice').textContent = `Total Price: ${totalPrice} kr`;
    SaveCartToLocalStorage();
}

function ChangeButtonTextOnClick(button) {
    button.innerHTML = "Added";
    setTimeout(function() {
        button.innerHTML = "Add to cart";
    }, 1000);
}

var buttons = document.getElementsByClassName("cartButton");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        AddToCart('Ham Sandwich', 35, this);
    });
}

function SaveCartToLocalStorage() {
    const cartItems = [];
    const cart = document.getElementById('cart');
    const items = cart.getElementsByTagName('li');
    
    // Loop through all the items in the cart and save the data (name and price)
    for (let item of items) {
        const productName = item.querySelector('span').textContent;  // Get the product name
        const productPrice = item.querySelector('.badge').textContent;  // Get the price
        cartItems.push({ productName, productPrice });
    }

    // Store the cart data in localStorage as a JSON string
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function LoadCartFromLocalStorage() {
    const cart = document.getElementById('cart');
    const savedCartItems = localStorage.getItem('cartItems');
    
    // If there are items in localStorage, load them into the cart
    if (savedCartItems) {
        const cartItems = JSON.parse(savedCartItems);

        // Loop through the saved items and render them in the cart
        for (let item of cartItems) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${item.productName}</span>
                <div class="d-flex align-items-center">
                    <span class="badge bg-primary me-2">${item.productPrice}</span>
                    <span class="text-danger remove-button" style="cursor: pointer;">&#10005;</span>
                </div>
            `;
            cart.appendChild(li);
            totalPrice += parseFloat(item.productPrice);
            AttachRemoveEvent(li.querySelector('.remove-button'), item.productPrice);
        }
        document.getElementById('totalPrice').textContent = `Total Price: ${totalPrice} kr`;
    }
}

function AttachRemoveEvent(button, productPrice) {
    button.addEventListener('click', function() {
        RemoveFromCart(button, productPrice);
    });
}

window.onload = function() {
    LoadCartFromLocalStorage();
};