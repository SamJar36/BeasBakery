function AddToCart(productName, productPrice)
{
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
}
function RemoveFromCart(element) {
    element.parentElement.parentElement.remove();
}