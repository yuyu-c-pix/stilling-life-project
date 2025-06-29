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
      <img src="${item.imgSrc}" alt="${item.name}" />
      <div class="cart-item-details">
        <div>${item.name}</div>
        <div>Qty: ${item.quantity}</div>
      </div>
      <div class="cart-item-meta">
        <div>${item.price}</div>
        <button class="cart-item-remove" data-index="${index}">×</button>
      </div>
    `;

    div.querySelector(".cart-item-remove").addEventListener("click", () => {
      items.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(items));
      renderCartItems();
    });

    container.appendChild(div);
  });
}

function initStore() {
  const buttons = document.querySelectorAll(".add-to-cart-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const img = gridItem.querySelector("img");
      const name = gridItem.querySelector(".caption")?.textContent.trim() || "Item";
      const price = gridItem.querySelector(".item-price")?.textContent.trim() || "0 KRW";
      const imgSrc = img?.src || "";

      // 기존 장바구니 불러오기
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingIndex = stored.findIndex(item => item.imgSrc === imgSrc);

      if (existingIndex !== -1) {
        stored[existingIndex].quantity += 1;
      } else {
        stored.push({ imgSrc, name, price, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(stored));
      renderCartItems();

      // 썸네일 애니메이션
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

  renderCartItems(); // 페이지 로드시 렌더
}

// 이미 DOMContentLoaded가 처리된 상태에서도 동작하게 보장
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStore);
} else {
  initStore();
}
