function AddToCart(productName, productPrice)
{
    ChangeButtonTextOnClick();
    const cart = document.getElementById('cart');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span>${productName}</span>
        <div class="d-flex align-items-center">
            <span class="badge bg-primary me-2">${productPrice} kr</span>
            <span class="text-danger" style="cursor: pointer;" onclick="RemoveFromCart(this)">&#10005;</span>
        </div>
    `;
    cart.appendChild(li);

    SaveCartToLocalStorage();
}
function RemoveFromCart(element) {
    element.parentElement.parentElement.remove();
    SaveCartToLocalStorage();
}
function ChangeButtonTextOnClick() {
    var button = document.getElementById("cartButton");
    button.innerHTML = "Added";
    setTimeout(function() {
        button.innerHTML = "Add to cart";
    }, 1000);
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
                    <span class="text-danger" style="cursor: pointer;" onclick="RemoveFromCart(this)">&#10005;</span>
                </div>
            `;
            cart.appendChild(li);
        }
    }
}
window.onload = function() {
    LoadCartFromLocalStorage();
};