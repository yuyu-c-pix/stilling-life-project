document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("centerInput");
  const history = document.getElementById("history");
  const objects = document.querySelectorAll(".floating-object");

  const speeds = [], positions = [], angles = [];
  const marginX = 10;

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

  input.addEventListener("keydown", async function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const location = await getCityName();
      const userInput = input.value.trim();
      const entryText = `${location}, ${userInput.toUpperCase()}`;

      addHistoryEntry(entryText);
      input.value = "";
      saveToLocalStorage(entryText);
    }
  });

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

  // floating object 초기화
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
});
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const navOverlay = document.getElementById("nav-overlay");
  const headerLogo = document.querySelector(".header-logo");
  
  if (toggleButton && navOverlay && headerLogo) {
    toggleButton.addEventListener("click", (e) => {
      e.preventDefault();
      navOverlay.classList.toggle("active");
      headerLogo.classList.toggle("move-down");
      if (navOverlay.classList.contains("active")) {
      
  
  } 

    });
  } else {
    console.warn("⚠️ toggleButton/navOverlay/headerLogo 요소를 찾을 수 없습니다.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelectorAll(".header-icon")[0]; // 돋보기 아이콘
  const searchOverlay = document.getElementById("search-overlay");

  if (searchIcon && searchOverlay) {
    searchIcon.addEventListener("click", () => {
      searchOverlay.classList.toggle("active");
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("centerInput");
  const history = document.getElementById("history");
  const objects = document.querySelectorAll(".floating-object");

  const speeds = [], positions = [], angles = [];
  const marginX = 10;

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

  input.addEventListener("keydown", async function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const location = await getCityName();
      const userInput = input.value.trim();
      const entryText = `${location}, ${userInput.toUpperCase()}`;

      addHistoryEntry(entryText);
      input.value = "";
      saveToLocalStorage(entryText);
    }
  });

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

  // floating object 초기화
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
});
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const navOverlay = document.getElementById("nav-overlay");
  const headerLogo = document.querySelector(".header-logo");
  
  if (toggleButton && navOverlay && headerLogo) {
    toggleButton.addEventListener("click", (e) => {
      e.preventDefault();
      navOverlay.classList.toggle("active");
      headerLogo.classList.toggle("move-down");

    });
  } else {
    console.warn("⚠️ toggleButton/navOverlay/headerLogo 요소를 찾을 수 없습니다.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelectorAll(".header-icon")[0]; // 돋보기 아이콘
  const searchOverlay = document.getElementById("search-overlay");

  if (searchIcon && searchOverlay) {
    searchIcon.addEventListener("click", () => {
      searchOverlay.classList.toggle("active");
    });
  }
});

const pages = [
  { title: "WHAT WE STILL", url: "/what-westill/index.html" },
  { title: "PROJECT ARCHIVE", url: "/project-archive/index.html" },
  { title: "TACTILE STORE", url: "/tactile-store/index.html" },
  { title: "WHAT YOU STILL", url: "/project-subpage.html" }
];
const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keydown", function (e) {
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

const imageData = [
  { src: "./1.png", style: { zIndex: 3 } },
  { src: "./2.png", style: { zIndex: 10 } },
  { src: "./3.png", style: { zIndex: 9 } },
  { src: "./4.png", style: { zIndex: 9 } },
  { src: "./5.png", style: { zIndex: 9 } },
  { src: "./6.png", style: { zIndex: 8 } }
];

const container = document.getElementById("floating-images");

imageData.forEach(({ src, style }) => {
  const img = document.createElement("img");
  img.src = src;
  img.className = "floating-img";
  Object.assign(img.style, style);
  img.style.cursor = "grab";

  // append 먼저
  container.appendChild(img);

  // 로드된 후 위치, 회전 설정
  img.onload = () => {
  const isMobile = window.innerWidth < 768;
  const randWidth = isMobile
  ? Math.random() * 6 + 6  // 👉 모바일: 6~12vw
  : Math.random() * 4 + 4; // 👉 데스크탑: 4~8vw
  img.style.setProperty("width", `${randWidth}vw`, "important"); // 확실히 덮어쓰기

  img.style.left = `${Math.random() * 70 + 5}vw`;
  img.style.top = `${Math.random() * 70 + 5}vh`;
  img.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
  };
  // 드래그 가능하게 만들기
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const onMouseDown = (e) => {
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
  };

  const onTouchStart = (e) => {
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
  };

  img.addEventListener("mousedown", onMouseDown);
  img.addEventListener("touchstart", onTouchStart, { passive: false });
});
// 예: 랜덤 좌표 범위 조정 (왼쪽/위로 너무 안가게)



document.addEventListener("click", (e) => {
  const cartToggle = e.target.closest("#cart-toggle");
  const cartOverlay = document.getElementById("cart-overlay");

  if (cartToggle && cartOverlay) {
    cartOverlay.classList.toggle("active");
  }
  });

  // 상품 이미지 클릭 시 카트로 애니메이션 및 저장
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const img = gridItem?.querySelector("img");
      if (!img) return;

      const imgSrc = img.src;

      // 로컬스토리지에 이미지 저장
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      stored.push(imgSrc);
      localStorage.setItem("cartItems", JSON.stringify(stored));

      // 이미지 복제 후 애니메이션
      const clone = img.cloneNode();
      const rect = img.getBoundingClientRect();

      Object.assign(clone.style, {
        position: "fixed",
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${img.offsetWidth}px`,
        height: `${img.offsetHeight}px`,
        opacity: "0.7",
        transition: "all 1s ease-in-out",
        zIndex: "9999",
        pointerEvents: "none"
      });

      document.body.appendChild(clone);

      // 카트 아이콘 위치로 이동
      setTimeout(() => {
        clone.style.left = "calc(100vw - 48px)";
        clone.style.top = "12px";
        clone.style.width = "40px";
        clone.style.height = "40px";
        clone.style.opacity = "0";
      }, 10);

      // 애니메이션 끝나면 제거
      setTimeout(() => {
        clone.remove();
      }, 1100);
    });
  });

