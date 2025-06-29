fetch("/stilling-life-project/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;

    const script = document.createElement("script");
    script.src = "../script.js";

    script.onload = () => {
      const logoScript = document.createElement("script");
      logoScript.src = "../logo-color.js";

      logoScript.onload = () => {
        // 이벤트 바인딩
        setTimeout(() => {
          const toggleButton = document.getElementById("menu-toggle");
          const closeBtn = document.getElementById("nav-close-toggle");
          const navOverlay = document.getElementById("nav-overlay");
          const headerLogo = document.querySelector(".header-logo");
          const cartToggle = document.getElementById("cart-toggle");
          const cartOverlay = document.getElementById("cart-overlay");

          if (toggleButton && navOverlay && headerLogo) {
            toggleButton.addEventListener("click", (e) => {
              e.preventDefault();
              const isOpen = navOverlay.classList.contains("active");

              // 메뉴 오버레이를 토글
              navOverlay.classList.toggle("active");
              headerLogo.classList.toggle("move-down");

              if (!isOpen) {
                // 메뉴 오버레이가 열릴 때 로고 색상 변경
                headerLogo.style.filter = `invert(1) sepia(1) saturate(5) hue-rotate(${Math.random() * 360}deg)`;
              } else {
                // 메뉴 오버레이가 닫힐 때 로고 색상 복원
                resetLogoStyle();
              }
            });
          }

          if (closeBtn && navOverlay && headerLogo) {
            closeBtn.addEventListener("click", () => {
              // 메뉴 오버레이가 닫힐 때 로고 색상 복원
              navOverlay.classList.remove("active");
              headerLogo.classList.remove("move-down");
              resetLogoStyle();
            });
          }

          if (cartToggle && cartOverlay) {
            cartToggle.addEventListener("click", () => {
              cartOverlay.classList.toggle("active");
            });
          }

          // 오버레이 외부 클릭 시 로고 색상 복원
          document.addEventListener("click", (e) => {
            const searchOverlay = document.getElementById("search-overlay");
            if (
              searchOverlay?.classList.contains("active") &&
              !e.target.closest("#search-overlay") &&
              !e.target.closest(".header-icon")
            ) {
              searchOverlay.classList.remove("active");
            }

            if (
              navOverlay?.classList.contains("active") &&
              !e.target.closest("#nav-overlay") &&
              !e.target.closest("#menu-toggle")
            ) {
              // 메뉴 오버레이 닫기
              navOverlay.classList.remove("active");
              headerLogo?.classList.remove("move-down");
              resetLogoStyle();  // 로고 복원
            }

            if (
              cartOverlay?.classList.contains("active") &&
              !e.target.closest("#cart-overlay") &&
              !e.target.closest("#cart-toggle")
            ) {
              cartOverlay.classList.remove("active");
              resetLogoStyle();  // 로고 복원
            }
          });
        }, 100);
      };

      document.body.appendChild(logoScript);
    };

    document.body.appendChild(script);
  });

// resetLogoStyle() 함수는 여기에서 다시 정의되어야 합니다.
function resetLogoStyle() {
  const headerLogo = document.querySelector(".header-logo");
  if (headerLogo) {
    headerLogo.classList.remove("move-down");
    headerLogo.style.color = "black";  // 로고 색상 초기화
    headerLogo.style.filter = "";  // 필터 초기화
  }
}
