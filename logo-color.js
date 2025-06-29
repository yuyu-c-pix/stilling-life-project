// 전역 선언
const variantClasses = [
  "logo-variant-1",
  "logo-variant-2",
  "logo-variant-3",
  "logo-variant-4",
  "logo-variant-5"
];
const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFD700"];
let currentColor = 0;
let headerLogo = null;

function setupLogoColor() {
  headerLogo = document.querySelector(".header-logo");
  const toggleButton = document.getElementById("menu-toggle");
  const navOverlay = document.getElementById("nav-overlay");
  const searchIcon = document.querySelectorAll(".header-icon")[0];
  const searchOverlay = document.getElementById("search-overlay");

  // 요소가 아직 안 나타난 경우 재시도
  if (!headerLogo || !toggleButton || !navOverlay || !searchOverlay) {
    setTimeout(setupLogoColor, 50);
    return;
  }

  // 햄버거 버튼 클릭 시
  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navOverlay.classList.contains("active");

    searchOverlay.classList.remove("active");
    navOverlay.classList.toggle("active");
    headerLogo.classList.toggle("move-down");

    document.body.classList.remove(...variantClasses);
    if (!isOpen) {
      const randomClass = variantClasses[Math.floor(Math.random() * variantClasses.length)];
      document.body.classList.add(randomClass);

      headerLogo.style.filter = `invert(1) sepia(1) saturate(5) hue-rotate(${Math.random() * 360}deg)`;
      headerLogo.style.color = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;
    } else {
      resetLogoStyle();
    }
  });

  // 검색 아이콘 클릭 시
  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = searchOverlay.classList.contains("active");

    navOverlay.classList.remove("active");
    searchOverlay.classList.toggle("active");
    headerLogo.classList.toggle("move-down");

    document.body.classList.remove(...variantClasses);
    if (!isOpen) {
      const randomClass = variantClasses[Math.floor(Math.random() * variantClasses.length)];
      document.body.classList.add(randomClass);

      headerLogo.style.filter = `invert(1) sepia(1) saturate(5) hue-rotate(${Math.random() * 360}deg)`;
      headerLogo.style.color = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;
    } else {
      resetLogoStyle();
    }
  });

  // 검색창 내부 클릭 시 이벤트 전파 차단
  const searchBox = document.querySelector(".search-box");
  if (searchBox) {
    searchBox.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // 아무 곳이나 클릭 시 닫기
  document.addEventListener("click", () => {
    navOverlay.classList.remove("active");
    searchOverlay.classList.remove("active");
    resetLogoStyle();
  });
}

// DOM 렌더 완료 후 실행
setTimeout(setupLogoColor, 0);

// 외부에서 호출 가능한 reset 함수
function resetLogoStyle() {
  if (!headerLogo) return;
  headerLogo.classList.remove("move-down");
  headerLogo.style.color = "";
  headerLogo.style.filter = "";
  document.body.classList.remove(...variantClasses);
}
window.resetLogoStyle = resetLogoStyle;
