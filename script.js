function addToCart(name, price) {
    const cart = getCart();
  
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    console.log(cart);
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  }
  
  // Get cart
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  
  
  
  // Save cart
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  // Remove item by name
  function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter((item) => item.name !== name);
    saveCart(cart);
    window.location.reload();
    console.log(cart);
  }
  
  function clearCart() {
    localStorage.removeItem("cart");
    window.location.reload();
  }
  
  if (window.location.pathname.includes("cart.html")) {
    const cart = getCart();
    const tbody = document.querySelector("#cartTable tbody");
  
    if (cart.length === 0) {
      tbody.innerHTML = `
          <tr>
            <td colspan="5">Your cart is empty</td>
          </tr>`;
    } else {
      let total = 0;
  
      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        tbody.innerHTML += `
              <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart('${item.name}')">Remove
                </button></td>
              </tr>
            `;
      });
  
      tbody.innerHTML += `
            <tr>
              <td colspan="3" style="text-align:right;"><strong>Grand Total:</strong></td>
              <td><strong>$${total.toFixed(2)}</strong></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="5" style="text-align:right;">
                <button onclick="clearCart()">Clear Cart</button>
              </td>
            </tr>
          `;
    }
  }