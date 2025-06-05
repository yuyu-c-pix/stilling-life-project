const video = document.getElementById("landing-video");

function goToMain() {
  video.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "project-archive/index.html";
  }, 1000);
}

// 영상 끝나거나 화면 클릭 → 메인으로
video.addEventListener("ended", goToMain);
document.addEventListener("click", goToMain);
window.addEventListener("touchstart", () => video.play().catch(() => {}), { once: true });

// 영상 자동 재생 시도 (1회만)
function tryPlay() {
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Autoplay prevented:", error);
    });
  }
}

// 재생 가능 시점에 실행
video.addEventListener("canplay", tryPlay);
document.addEventListener("DOMContentLoaded", tryPlay);
