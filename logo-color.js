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

  toggleButton.addEventListener("click", () => {
    requestAnimationFrame(() => {
      const isActive = navOverlay.classList.contains("active");

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
    });
  });
  searchIcon.addEventListener("click", () => {
  requestAnimationFrame(() => {
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
  });
    // 햄버거 클릭
  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation(); // 문서 클릭 이벤트 전파 막기
    const isOpen = navOverlay.classList.contains("active");

    searchOverlay.classList.remove("active");

    navOverlay.classList.toggle("active");
    headerLogo.classList.toggle("move-down");

    document.body.classList.remove(...variantClasses);
    if (!isOpen) {
      const randomClass = variantClasses[Math.floor(Math.random() * variantClasses.length)];
      document.body.classList.add(randomClass);
    }
  });

  // 돋보기 클릭
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
    }
  });

  // 아무 곳이나 클릭 → 둘 다 닫기
  document.addEventListener("click", () => {
    navOverlay.classList.remove("active");
    searchOverlay.classList.remove("active");
    headerLogo.classList.remove("move-down");
    document.body.classList.remove(...variantClasses);
  });
  document.querySelector(".search-box").addEventListener("click", (e) => {
  e.stopPropagation();
    });
  

});

}

// DOM이 반영된 이후 실행 보장
setTimeout(setupLogoColor, 0);

function resetLogoStyle() {
  headerLogo.classList.remove("move-down");
  headerLogo.style.color = "";
  headerLogo.style.filter = "";
  document.body.classList.remove(...variantClasses);
}
window.resetLogoStyle = resetLogoStyle;
