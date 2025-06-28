document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const img = gridItem.querySelector("img");
      const imgSrc = img.src;

      // 썸네일 정보 localStorage에 저장
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      stored.push(imgSrc);
      localStorage.setItem("cartItems", JSON.stringify(stored));

      // 이미지 복제 후 화면 우측 상단으로 애니메이션 이동
      const clone = img.cloneNode();
      clone.style.position = "fixed";
      clone.style.left = img.getBoundingClientRect().left + "px";
      clone.style.top = img.getBoundingClientRect().top + "px";
      clone.style.width = img.offsetWidth + "px";
      clone.style.height = img.offsetHeight + "px";
      clone.style.opacity = "0.7";
      clone.style.transition = "all 1s ease-in-out";
      clone.style.zIndex = "9999";
      document.body.appendChild(clone);

      // 카트 위치로 이동
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
});
