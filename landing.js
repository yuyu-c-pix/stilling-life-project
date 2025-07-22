document.addEventListener("DOMContentLoaded", () => {
  // 화면 크기에 따라 재생할 video 요소 선택
  const isMobile = window.innerWidth <= 768;
  const video = document.getElementById(
    isMobile ? "landing-video-mobile" : "landing-video-desktop"
  );

  if (!video) {
    console.warn("비디오를 찾을 수 없습니다.");
    return;
  }

  // autoplay 강제 재시도
  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Autoplay 실패:", error);
      });
    }
  };

  // Safari 대응
  video.addEventListener("canplay", tryPlay);
  window.addEventListener("touchstart", tryPlay, { once: true });

  // 영상 클릭 or 끝날 때 → 페이드아웃 후 이동
  const fadeAndRedirect = () => {
    video.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "project-archive/index.html";
    }, 1000);
  };

  document.addEventListener("click", fadeAndRedirect);
  video.addEventListener("ended", fadeAndRedirect);
});
