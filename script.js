document.addEventListener("DOMContentLoaded", () => {
  // ----------- 지역 + 입력 히스토리 기능 -----------
  const input = document.getElementById("centerInput");
  const history = document.getElementById("history");
  const objects = document.querySelectorAll(".floating-object");
  const marginX = 10;
  const speeds = [], positions = [], angles = [];

  function containsKorean(text) {
    return /[\u3131-\uD79D]/ugi.test(text);
  }

  function saveToLocalStorage(text) {
    const existing = JSON.parse(localStorage.getItem("historyEntries") || "[]");
    existing.push(text);
    localStorage.setItem("historyEntries", JSON.stringify(existing));
  }

  function addHistoryEntry(text) {
    const entry = document.createElement("div");
    entry.className = "history-entry";

    const city = text.split(",")[0];
    const message = text.substring(text.indexOf(",") + 1).trim();

    const spanCity = document.createElement("span");
    spanCity.textContent = city + ", ";
    const spanText = document.createElement("span");
    spanText.className = "entry-text";
    spanText.textContent = message;

    if (containsKorean(message)) entry.classList.add("ko");

    entry.appendChild(spanCity);
    entry.appendChild(spanText);
    history.prepend(entry);
  }

  function loadFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem("historyEntries") || "[]");
    saved.forEach(addHistoryEntry);
  }

  async function getCityName() {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.region.toUpperCase();
    } catch {
      return "UNKNOWN";
    }
  }

  input?.addEventListener("keydown", async function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const location = await getCityName();
      const userInput = input.value.trim();
      const entryText = `${location}, ${userInput.toUpperCase()}`;
      addHistoryEntry(entryText);
      input.value = "";
      saveToLocalStorage(entryText);
    }
  });

  // ----------- floating object animation -----------
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

    objects.forEach((el, i) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const pos = positions[i];
      const spd = speeds[i];
      const angle = angles[i];

      pos.x += spd.dx;
      pos.y += spd.dy;

      if (pos.x <= marginX || pos.x + w >= screenWidth - marginX) {
        spd.dx *= -1;
        pos.x = Math.max(marginX, Math.min(pos.x, screenWidth - w - marginX));
      }

      if (pos.y <= 0 || pos.y + h >= screenHeight) {
        spd.dy *= -1;
        pos.y = Math.max(0, Math.min(pos.y, screenHeight - h));
      }

      angle.angle += angle.rotationSpeed;
      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;
      el.style.transform = `rotate(${angle.angle}deg)`;
    });

    requestAnimationFrame(animate);
  }

  loadFromLocalStorage();
  let loaded = 0;
  objects.forEach((el, i) => {
    if (el.complete) {
      initObjectPosition(el, i);
      loaded++;
      if (loaded === objects.length) requestAnimationFrame(animate);
    } else {
      el.onload = () => {
        initObjectPosition(el, i);
        loaded++;
        if (loaded === objects.length) requestAnimationFrame(animate);
      };
    }
  });

  window.onresize = () => {
    objects.forEach((el, i) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      positions[i].x = Math.min(positions[i].x, window.innerWidth - w - marginX);
      positions[i].y = Math.min(positions[i].y, window.innerHeight - h);
    });
  };

  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("selectstart", (e) => e.preventDefault());

  // ----------- 오버레이 토글 통합 -----------
  const cartOverlay = document.getElementById("cart-overlay");
  const navOverlay = document.getElementById("nav-overlay");
  const searchOverlay = document.getElementById("search-overlay");

  const cartButton = document.getElementById("cart-toggle");
  const navButton = document.getElementById("menu-toggle");
  const searchButton = document.querySelector(".header-icon");
  const headerLogo = document.querySelector(".header-logo");

  if (navButton && navOverlay && headerLogo) {
    navButton.addEventListener("click", (e) => {
      e.preventDefault();
      navOverlay.classList.toggle("active");
      headerLogo.classList.toggle("move-down");
    });
  }

  if (searchButton && searchOverlay) {
    searchButton.addEventListener("click", () => {
      searchOverlay.classList.toggle("active");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      cartOverlay?.classList.contains("active") &&
      !cartOverlay.contains(e.target) &&
      e.target !== cartButton &&
      !cartButton?.contains(e.target)
    ) cartOverlay.classList.remove("active");

    if (
      navOverlay?.classList.contains("active") &&
      !navOverlay.contains(e.target)
    ) {
      navOverlay.classList.remove("active");
      headerLogo?.classList.remove("move-down");
    }

    if (
      searchOverlay?.classList.contains("active") &&
      !searchOverlay.contains(e.target)
    ) {
      searchOverlay.classList.remove("active");
    }
  });

  // ----------- floating-img 생성 및 드래그 -----------
  const imageData = [
  { src: "./1.png", style: { zIndex: 3 } },
  { src: "./2.png", style: { zIndex: 10 } },
  { src: "./3.png", style: { zIndex: 9 } },
  { src: "./4.png", style: { zIndex: 9 } },
  { src: "./5.png", style: { zIndex: 9 } },
  { src: "./6.png", style: { zIndex: 8 } }
];

const container = document.getElementById("floating-images");

if (!container) {
  console.warn("⚠️ <div id='floating-images'> 요소를 찾을 수 없습니다.");
} else {
  imageData.forEach(({ src, style }) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "floating-img floating-object";
    Object.assign(img.style, style);
    img.style.cursor = "grab";
    container.appendChild(img);

    img.onload = () => {
      const isMobile = window.innerWidth < 768;
      const randWidth = isMobile ? Math.random() * 6 + 6 : Math.random() * 4 + 4;
      img.style.setProperty("width", `${randWidth}vw`, "important");
      img.style.left = `${Math.random() * 70 + 5}vw`;
      img.style.top = `${Math.random() * 70 + 5}vh`;
      img.style.transform = `rotate(${Math.random() * 60 - 30}deg)`; // ✅ 고친 부분
    };

    // 드래그 이벤트
    let isDragging = false, startX = 0, startY = 0;

    img.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - img.offsetLeft;
      startY = e.clientY - img.offsetTop;
      img.style.cursor = "grabbing";
      e.preventDefault();

      const onMouseMove = (e) => {
        if (!isDragging) return;
        img.style.left = `${e.clientX - startX}px`;
        img.style.top = `${e.clientY - startY}px`;
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
        if (!isDragging) return;
        const touch = e.touches[0];
        img.style.left = `${touch.clientX - startX}px`;
        img.style.top = `${touch.clientY - startY}px`;
      };

      const onTouchEnd = () => {
        isDragging = false;
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };

      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
    }, { passive: false });
  });
}

  // ----------- 검색 입력 → 페이지 이동 기능 -----------
  const pages = [
    { title: "WHAT WE STILL", url: "/what-westill/index.html" },
    { title: "PROJECT ARCHIVE", url: "/project-archive/index.html" },
    { title: "TACTILE STORE", url: "/tactile-store/index.html" },
    { title: "WHAT YOU STILL", url: "/project-subpage.html" }
  ];

  const searchInput = document.querySelector(".search-box input");

  searchInput?.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const query = searchInput.value.trim().toLowerCase();
      const result = pages.find(p => p.title.toLowerCase().includes(query));
      if (result) {
        window.location.href = result.url;
      } else {
        alert("No matching page found.");
      }
    }
  });

  // ----------- 카트 이미지 저장 및 렌더링 -----------
  const cartList = document.getElementById("cart-items");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const img = e.target.closest(".product-item").querySelector("img");
      const imgClone = img.cloneNode();
      imgClone.classList.add("floating-img");
      document.body.appendChild(imgClone);

      const { left, top, width, height } = img.getBoundingClientRect();
      imgClone.style.position = "fixed";
      imgClone.style.left = `${left}px`;
      imgClone.style.top = `${top}px`;
      imgClone.style.width = `${width}px`;
      imgClone.style.height = `${height}px`;
      imgClone.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      imgClone.style.transform = "translate(0, 0)";
      imgClone.style.opacity = "0";

      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      items.push(img.src);
      localStorage.setItem("cartItems", JSON.stringify(items));

      setTimeout(() => {
        imgClone.remove();
        renderCartItems();
      }, 500);
    });
  });

  function renderCartItems() {
    if (!cartList) return;
    cartList.innerHTML = "";
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");

    items.forEach((imgSrc, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "cart-item";
      wrapper.style.marginBottom = "16px";

      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `Item ${index + 1}`;
      img.className = "cart-thumb";

      const quantity = document.createElement("span");
      quantity.textContent = "Qty: 1";
      quantity.className = "cart-qty";

      const price = document.createElement("span");
      price.textContent = "28.00 EUR";
      price.className = "cart-price";

      wrapper.appendChild(img);
      wrapper.appendChild(quantity);
      wrapper.appendChild(price);
      cartList.appendChild(wrapper);
    });
  }

  renderCartItems();
});
