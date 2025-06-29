function setupLogoColor() {
  const headerLogo = document.querySelector(".header-logo");
  const toggleButton = document.getElementById("menu-toggle");
  const navOverlay = document.getElementById("nav-overlay");
  const searchIcon = document.querySelectorAll(".header-icon")[0];
  const searchOverlay = document.getElementById("search-overlay");

  // 요소들이 아직 주입되지 않은 경우 재시도
  if (!headerLogo || !toggleButton || !navOverlay) {
    setTimeout(setupLogoColor, 50);
    return;
  }

  const variantClasses = [
    "logo-variant-1",
    "logo-variant-2",
    "logo-variant-3",
    "logo-variant-4",
    "logo-variant-5"
  ];
  
  let currentIndex = 0;
  let currentColor = 0;  // 컬러 인덱스 변수 추가

  // 메뉴 토글 버튼 클릭 시 처리
  toggleButton.addEventListener("click", (e) => {
    e.preventDefault();  // 기본 동작 방지
    const isActive = navOverlay.classList.contains("active");

    // 네비게이션 오버레이와 로고 스타일 업데이트
    if (isActive) {
      headerLogo.classList.add("move-down");
      headerLogo.style.filter = `invert(1) sepia(1) saturate(5) hue-rotate(${Math.random() * 360}deg)`;
      headerLogo.style.color = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;  // 색상 변경
    } else {
      headerLogo.classList.remove("move-down");
      headerLogo.style.color = "";
      headerLogo.style.filter = "";
    }

    navOverlay.classList.toggle("active");
    headerLogo.classList.toggle("move-down");
  });

  // 돋보기(검색 아이콘) 클릭 시 처리
  searchIcon.addEventListener("click", () => {
    const isActive = searchOverlay.classList.contains("active");

    if (isActive) {
      headerLogo.classList.add("move-down");
      headerLogo.style.filter = `invert(1) sepia(1) saturate(5) hue-rotate(${Math.random() * 360}deg)`;
      headerLogo.style.color = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;
    } else {
      headerLogo.classList.remove("move-down");
      headerLogo.style.color = "";
      headerLogo.style.filter = "";
    }

    searchOverlay.classList.toggle("active");
    headerLogo.classList.toggle("move-down");
  });

  // 아무 곳이나 클릭 → 모든 오버레이 닫기
  document.addEventListener("click", (e) => {
    const searchOverlay = document.getElementById("search-overlay");
    if (
      searchOverlay?.classList.contains("active") &&
      !e.target.closest("#search-overlay") &&
      !e.target.closest(".header-icon")
    ) {
      searchOverlay.classList.remove("active");
    }

    // 네비게이션 오버레이 닫기
    if (
      navOverlay?.classList.contains("active") &&
      !e.target.closest("#nav-overlay") &&
      !e.target.closest("#menu-toggle")
    ) {
      navOverlay.classList.remove("active");
      headerLogo.classList.remove("move-down");
      resetLogoStyle();  // 로고 스타일 초기화
    }

    // 장바구니 오버레이 닫기
    const cartOverlay = document.getElementById("cart-overlay");
    if (
      cartOverlay?.classList.contains("active") &&
      !e.target.closest("#cart-overlay") &&
      !e.target.closest("#cart-toggle")
    ) {
      cartOverlay.classList.remove("active");
      resetLogoStyle();  // 로고 스타일 초기화
    }
  });

  // 검색박스 클릭 시 이벤트 전파 막기
  document.querySelector(".search-box").addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// DOM이 반영된 이후 실행 보장
setTimeout(setupLogoColor, 0);

// 로고 스타일 초기화 함수
function resetLogoStyle() {
  const headerLogo = document.querySelector(".header-logo");
  headerLogo.classList.remove("move-down");
  headerLogo.style.color = "";
  headerLogo.style.filter = "";
  document.body.classList.remove(...variantClasses);
}

window.resetLogoStyle = resetLogoStyle;
