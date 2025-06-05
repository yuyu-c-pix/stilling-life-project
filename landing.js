const video = document.getElementById("landing-video");

function goToMain() {
  video.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "project-archive/index.html";
  }, 1000);
}

// 메인 페이지로 넘어가는 트리거
video.addEventListener("ended", goToMain);
document.addEventListener("click", goToMain);

// iOS 대응: 처음 한 번의 터치 시 play 시도
window.addEventListener("touchstart", () => {
  video.play().catch(() => {});
}, { once: true });

// 재생 시도 함수 (자동 재생 정책 대응)
function tryPlay() {
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Autoplay success");
      })
      .catch(error => {
        console.warn("Autoplay prevented:", error);
      });
  }
}

// video 태그가 재생 가능한 시점이 되었을 때 실행
video.addEventListener("canplay", tryPlay);

// DOM이 완전히 로드된 후 시도 (fallback)
document.addEventListener("DOMContentLoaded", tryPlay);
