document.addEventListener("DOMContentLoaded", () => {
  // ---------- 공통 변수 초기화 ----------
  const input = document.getElementById("centerInput");
  const history = document.getElementById("history");
  const searchInput = document.querySelector(".search-box input");
  const floatingObjects = document.querySelectorAll(".floating-object");
  const speeds = [], positions = [], angles = [];
  const marginX = 10;

  // ---------- 오버레이 관련 요소 ----------
  const navOverlay = document.getElementById("nav-overlay");
  const cartOverlay = document.getElementById("cart-overlay");
  const searchOverlay = document.getElementById("search-overlay");
  const menuToggle = document.getElementById("menu-toggle");
  const cartToggle = document.getElementById("cart-toggle");
  const headerLogo = document.querySelector(".header-logo");
  const searchIcon = document.querySelectorAll(".header-icon")[0];

  // ---------- floating 이미지 동적 생성 (drag only) ----------
  const imageData = [
    { src: "./1.png", style: { zIndex: 3 } },
    { src: "./2.png", style: { zIndex: 10 } },
    { src: "./3.png", style: { zIndex: 9 } },
    { src: "./4.png", style: { zIndex: 9 } },
    { src: "./5.png", style: { zIndex: 9 } },
    { src: "./6.png", style: { zIndex: 8 } }
  ];
  const container = document.getElementById("floating-images");

  if (container) {
    imageData.forEach(({ src, style }) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "floating-img";
      Object.assign(img.style, style);
      img.style.position = "absolute";
      img.style.cursor = "grab";
      img.onload = () => {
        const isMobile = window.innerWidth < 768;
        const randWidth = isMobile ? Math.random() * 6 + 6 : Math.random() * 4 + 4;
        img.style.setProperty("width", `${randWidth}vw`, "important");
        img.style.left = `${Math.random() * 70 + 5}vw`;
        img.style.top = `${Math.random() * 70 + 5}vh`;
        img.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
      };

      // 드래그 기능
      let isDragging = false, startX = 0, startY = 0;
      img.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - img.offsetLeft;
        startY = e.clientY - img.offsetTop;
        img.style.cursor = "grabbing";
        const onMouseMove = (e) => {
          if (isDragging) {
            img.style.left = `${e.clientX - startX}px`;
            img.style.top = `${e.clientY - startY}px`;
          }
        };
        const onMouseUp = () => {
          isDragging = false;
          img.style.cursor = "grab";
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
      img.addEventListener("touchstart", (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - img.offsetLeft;
        startY = touch.clientY - img.offsetTop;
        const onTouchMove = (e) => {
          if (isDragging) {
            const touch = e.touches[0];
            img.style.left = `${touch.clientX - startX}px`;
            img.style.top = `${touch.clientY - startY}px`;
          }
        };
        const onTouchEnd = () => {
          isDragging = false;
          document.removeEventListener("touchmove", onTouchMove);
          document.removeEventListener("touchend", onTouchEnd);
        };
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
      }, { passive: false });

      container.appendChild(img);
    });
  }

  // ---------- floating-object 애니메이션 ----------
  function initObjectPosition(el, i) {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const x = Math.random() * (window.innerWidth - w - 2 * marginX) + marginX;
    const y = Math.random() * (window.innerHeight - h - 1);
    const dx = (Math.random() * 1.2 + 0.6) * (Math.random() < 0.5 ? -1 : 1);
    const dy = (Math.random() * 1.2 + 0.6) * (Math.random() < 0.5 ? -1 : 1);
    const angle = Math.random() * 360;
    const rotationSpeed = (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1);

    positions[i] = { x, y };
    speeds[i] = { dx, dy };
    angles[i] = { angle, rotationSpeed };

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = `rotate(${angle}deg)`;
  }

  function animate() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    floatingObjects.forEach((el, i) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const pos = positions[i];
      const spd = speeds[i];
      const angle = angles[i];
      pos.x += spd.dx;
      pos.y += spd.dy;
      if (pos.x <= marginX || pos.x + w >= screenWidth - marginX) spd.dx *= -1;
      if (pos.y <= 0 || pos.y + h >= screenHeight) spd.dy *= -1;
      angle.angle += angle.rotationSpeed;
      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;
      el.style.transform = `rotate(${angle.angle}deg)`;
    });
    requestAnimationFrame(animate);
  }

  let loaded = 0;
  floatingObjects.forEach((el, i) => {
    if (el.complete || el.tagName !== "IMG") {
      initObjectPosition(el, i);
      loaded++;
      if (loaded === floatingObjects.length) requestAnimationFrame(animate);
    } else {
      el.onload = () => {
        initObjectPosition(el, i);
        loaded++;
        if (loaded === floatingObjects.length) requestAnimationFrame(animate);
      };
    }
  });

  window.onresize = () => {
    floatingObjects.forEach((el, i) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      positions[i].x = Math.min(positions[i].x, window.innerWidth - w - marginX);
      positions[i].y = Math.min(positions[i].y, window.innerHeight - h);
    });
  };

  // ---------- 오버레이 외부 클릭 시 닫기 ----------
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (navOverlay && !navOverlay.contains(target) && target !== menuToggle) {
      navOverlay.classList.remove("active");
      headerLogo?.classList.remove("move-down");
    }
    if (cartOverlay && !cartOverlay.contains(target) && target !== cartToggle) {
      cartOverlay.classList.remove("active");
    }
    if (searchOverlay && !searchOverlay.contains(target) && target !== searchIcon) {
      searchOverlay.classList.remove("active");
    }
  });
});
