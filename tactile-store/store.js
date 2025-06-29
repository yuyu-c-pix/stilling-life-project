function initStore() {
  console.log("🔥 initStore 실행됨");
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
      countElement.textContent = `${count} Item${count !== 1 ? "s" : ""}`;
    }
  }

  function removeFromLocalStorage(src) {
    const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const filtered = stored.filter(item => item.imgSrc !== src);
    localStorage.setItem("cartItems", JSON.stringify(filtered));
  }

  // 버튼 클릭 시 이벤트 처리
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const img = gridItem.querySelector("img");
      const imgSrc = img.src;

      const name = gridItem.querySelector(".caption")?.textContent.trim() || "Item";
      const price = gridItem.querySelector(".item-price")?.textContent.trim() || "0 KRW";

      // 중복 방지
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const exists = stored.some(item => item.imgSrc === imgSrc);
      if (!exists) {
        stored.push({ imgSrc, name, price });
        localStorage.setItem("cartItems", JSON.stringify(stored));
        addToCartItem(imgSrc, name, price);
      }

      // 썸네일 슬라이딩 애니메이션
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

  // 저장된 항목을 초기 렌더링
  const savedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  savedItems.forEach(({ imgSrc, name, price }) => {
    addToCartItem(imgSrc, name, price);
  });
}

window.addEventListener("load", () => {
  const waitForCartReady = () => {
    const cart = document.getElementById("cart-items");
    if (cart) {
      console.log("🔥 cart ready → initStore 실행됨");
      initStore();
    } else {
      console.log("⏳ cart 아직 준비 안 됨, 재시도 중...");
      setTimeout(waitForCartReady, 50);
    }
  };

  waitForCartReady();
});

function addToCartItem(imgSrc, name = "Item", price = "0", quantity = 1) {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  const existingItem = [...cartItemsContainer.children].find(item =>
    item.dataset.name === name
  );

  if (existingItem) {
    const qtyElem = existingItem.querySelector(".qty-count");
    qtyElem.textContent = "Qty:" + (parseInt(qtyElem.textContent.split(":")[1]) + 1);
    return;
  }

  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.dataset.name = name;
  // ...
  cartItem.innerHTML = `
    <img src="${imgSrc}" />
    <div class="cart-item-details">
      <div>${name}</div>
      <div class="qty-count">Qty:${quantity}</div>
    </div>
    <div class="cart-item-meta">
      <div>${price}</div>
      <button class="cart-item-remove">×</button>
    </div>
  `;
  // ...
}
