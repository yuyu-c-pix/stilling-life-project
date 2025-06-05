const video = document.getElementById("landing-video");

function goToMain() {
  video.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "project-archive/index.html"; // ← 메인 페이지 경로
  }, 1000); // 페이드 지속 시간과 일치
}

// 영상이 끝나거나 클릭하면 메인으로
video.addEventListener("ended", goToMain);
document.addEventListener("click", goToMain);


window.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("landing-video");
  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // 자동재생이 막혔을 경우 대체 동작 (예: 그냥 메인으로 넘어가기 등)
        console.warn("Autoplay prevented:", error);
        // window.location.href = 'project-archive/index.html'; // 선택적 fallback
      });
    }
  };
  tryPlay();
});

video.addEventListener("canplaythrough", tryPlay);

window.addEventListener("touchstart", () => {
  video.play().catch(() => {});
}, { once: true });

