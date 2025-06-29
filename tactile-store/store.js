document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart-button");

  // 카트에 아이템 추가
  function addToCartItem(imgSrc, name = "Item", price = 0, quantity = 1) {
    const cartItemsContainer = document.getElementById("cart-items");

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${imgSrc}" alt="${name}" />
      <div class="cart-item-details">
        <div>${name}</div>
        <div>Qty: ${quantity}</div>
      </div>
      <div class="cart-item-meta">
        <div>${price} EUR</div>
        <button class="cart-item-remove">×</button>
      </div>
    `;

    // 삭제 버튼 클릭 시
    cartItem.querySelector(".cart-item-remove").addEventListener("click", () => {
      cartItem.remove();
      updateCartCount();
      removeFromLocalStorage(imgSrc);
    });

    cartItemsContainer.appendChild(cartItem);
    updateCartCount();
  }

  // 카운트 업데이트
  function updateCartCount() {
    const count = document.querySelectorAll(".cart-item").length;
    const countElement = document.querySelector(".cart-count");
    if (countElement) {
      countElement.textContent = `${count} Items`;
    }
  }

  // localStorage에서 제거
  function removeFromLocalStorage(src) {
    const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const filtered = stored.filter(item => item.imgSrc !== src);
    localStorage.setItem("cartItems", JSON.stringify(filtered));
  }

  // "ADD TO CART" 클릭 시
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const img = gridItem.querySelector("img");
      const imgSrc = img.src;

      const name = gridItem.querySelector(".item-name")?.textContent || "Item";
      const price = gridItem.querySelector(".item-price")?.textContent?.replace("EUR", "").trim() || "0";

      // localStorage 저장
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      stored.push({ imgSrc, name, price });
      localStorage.setItem("cartItems", JSON.stringify(stored));

      // 카트에 렌더링
      addToCartItem(imgSrc, name, price);

      // 애니메이션
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

      setTimeout(() => {
        clone.remove();
      }, 1100);
    });
  });

  // 페이지 로드시 localStorage 복원
  const savedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  savedItems.forEach(({ imgSrc, name, price }) => {
    addToCartItem(imgSrc, name, price);
  });
});
