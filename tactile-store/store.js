function initStore() {
  const buttons = document.querySelectorAll(".add-to-cart-button");

  function addToCartItem(imgSrc, name = "Item", price = "0", quantity = 1) {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${imgSrc}" alt="${name}" />
      <div class="cart-item-details">
        <div>${name}</div>
        <div>Qty: ${quantity}</div>
      </div>
      <div class="cart-item-meta">
        <div>${price}</div>
        <button class="cart-item-remove">×</button>
      </div>
    `;

    cartItem.querySelector(".cart-item-remove").addEventListener("click", () => {
      cartItem.remove();
      updateCartCount();
      removeFromLocalStorage(imgSrc);
    });

    cartItemsContainer.appendChild(cartItem);
    updateCartCount();
  }

  function updateCartCount() {
    const count = document.querySelectorAll(".cart-item").length;
    const countElement = document.querySelector(".cart-count");
    if (countElement) {
      countElement.textContent = `${count} Items`;
    }
  }

  function removeFromLocalStorage(src) {
    const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const filtered = stored.filter(item => item.imgSrc !== src);
    localStorage.setItem("cartItems", JSON.stringify(filtered));
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const img = gridItem.querySelector("img");
      const imgSrc = img.src;

      const name = gridItem.querySelector(".caption")?.textContent.trim() || "Item";
      const price = gridItem.querySelector(".item-price")?.textContent.trim() || "0 KRW";

      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      stored.push({ imgSrc, name, price });
      localStorage.setItem("cartItems", JSON.stringify(stored));

      addToCartItem(imgSrc, name, price);

      const clone = img.cloneNode();
      const rect = img.getBoundingClientRect();
      clone.style.position = "fixed";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${img.offsetWidth}px`;
      clone.style.height = `${img.offsetHeight}px`;
      clone.style.opacity = "0.7";
      clone.style.transition = "all 1s ease-in-out";
      clone.style.zIndex = "9999";
      document.body.appendChild(clone);

      setTimeout(() => {
        clone.style.left = "calc(100vw - 48px)";
        clone.style.top = "12px";
        clone.style.width = "40px";
        clone.style.height = "40px";
        clone.style.opacity = "0";
      }, 10);

      setTimeout(() => clone.remove(), 1100);
    });
  });

  const savedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  savedItems.forEach(({ imgSrc, name, price }) => {
    addToCartItem(imgSrc, name, price);
  });
}

// 기존 DOMContentLoaded 안에서만 실행되던 것을 직접 호출
initStore();

function renderCartItems() {
  const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const container = document.getElementById("cart-items");
  const countEl = document.querySelector(".cart-count");
  if (!container || !countEl) return;

  container.innerHTML = "";
  countEl.textContent = `${items.length} Items`;

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-details">
        <div>${item.name}</div>
        <div>Qty: ${item.quantity}</div>
      </div>
      <div class="cart-item-meta">
        <div>${item.price}</div>
        <button class="cart-item-remove" data-index="${index}">×</button>
      </div>
    `;
    div.querySelector(".cart-item-remove").addEventListener("click", (e) => {
      items.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(items));
      renderCartItems();
    });
    container.appendChild(div);
  });
}

