let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to invoice!`);
}

function displayInvoice() {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('invoice-body');
    let subtotal = 0;
    tbody.innerHTML = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>J$${item.price.toLocaleString()}</td>`;
        tbody.appendChild(row);
        subtotal += item.price;
    });
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    document.getElementById('subtotal').textContent = `J$${subtotal.toLocaleString()}`;
    document.getElementById('tax').textContent = `J$${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    document.getElementById('total').textContent = `J$${total.toLocaleString()}`;
    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2">No products selected.</td></tr>';
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    window.location.reload();
}

function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username === "user" && password === "password") {
        window.location.href = "products.html";
    } else {
        document.getElementById('error-message').textContent = "Invalid login. Please try again.";
    }
}

if (window.location.pathname.includes('invoice.html')) {
    displayInvoice();
}
