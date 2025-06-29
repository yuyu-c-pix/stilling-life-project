function initStore() {
  console.log("initStore 실행됨");
  const buttons = document.querySelectorAll(".add-to-cart-button");

  function saveCartToLocalStorage() {
    const items = [];
    document.querySelectorAll(".cart-item").forEach(item => {
      const imgSrc = item.querySelector("img")?.src;
      const name = item.querySelector(".cart-item-details div:first-child")?.textContent;
      const price = item.querySelector(".cart-item-meta div:first-child")?.textContent;
      const qty = item.querySelector(".qty-count")?.textContent.replace("Qty:", "") || "1";
      items.push({ imgSrc, name, price, quantity: parseInt(qty) });
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  function addToCartItem(imgSrc, name = "Item", price = "0", quantity = 1) {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;

    const existingItem = [...cartItemsContainer.children].find(item =>
      item.dataset.name === name
    );

    if (existingItem) {
      const qtyElem = existingItem.querySelector(".qty-count");
      qtyElem.textContent = "Qty:" + (parseInt(qtyElem.textContent.split(":")[1]) + 1);
      saveCartToLocalStorage(); // 수량 업데이트 후 저장
      updateCartCount();
      return;
    }

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.dataset.name = name;

    cartItem.innerHTML = `
      <img src="${imgSrc}" alt="${name}" />
      <div class="cart-item-details">
        <div>${name}</div>
        <div class="qty-count">Qty:${quantity}</div>
      </div>
      <div class="cart-item-meta">
        <div>${price}</div>
        <button class="cart-item-remove">×</button>
      </div>
    `;

    cartItem.querySelector(".cart-item-remove").addEventListener("click", (e) => {
      e.stopPropagation();
      cartItem.remove();
      updateCartCount();
      saveCartToLocalStorage(); // 삭제 후 저장
    });

    cartItemsContainer.appendChild(cartItem);
    updateCartCount();
    saveCartToLocalStorage(); // 추가 후 저장
  }

  function updateCartCount() {
    const count = document.querySelectorAll(".cart-item").length;
    const countElement = document.querySelector(".cart-count");
    if (countElement) {
      countElement.textContent = `${count} Item${count !== 1 ? "s" : ""}`;
    }
  }

  // 버튼 클릭 시 이벤트 처리
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const img = gridItem.querySelector("img");
      const imgSrc = img.src;

      const name = gridItem.querySelector(".caption")?.textContent.trim() || "Item";
      const price = gridItem.querySelector(".item-price")?.textContent.trim() || "0 KRW";

      addToCartItem(imgSrc, name, price, 1);

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
  savedItems.forEach(({ imgSrc, name, price, quantity }) => {
    addToCartItem(imgSrc, name, price, quantity || 1);
  });
}

// 페이지 로드 후 cart 영역이 생겼을 때 initStore 실행
window.addEventListener("load", () => {
  const waitForCartReady = () => {
    const cart = document.getElementById("cart-items");
    if (cart) {
      console.log(" cart ready → initStore 실행됨");
      initStore();
    } else {
      console.log("cart 아직 준비 안 됨, 재시도 중...");
      setTimeout(waitForCartReady, 50);
    }
  };

  waitForCartReady();
});
