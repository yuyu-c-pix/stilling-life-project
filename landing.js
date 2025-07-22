document.addEventListener("DOMContentLoaded", () => {
  const video =
    window.innerWidth <= 768
      ? document.getElementById("landing-video-mobile")
      : document.getElementById("landing-video-desktop");

  if (!video) {
    console.warn("비디오 태그를 찾을 수 없음");
    return;
  }

  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Autoplay prevented:", error);
      });
    }
  };

  video.addEventListener("canplay", tryPlay);
  window.addEventListener("touchstart", tryPlay, { once: true });

  const fadeAndRedirect = () => {
    video.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "project-archive/index.html";
    }, 1000);
  };

  document.addEventListener("click", fadeAndRedirect);
  video.addEventListener("ended", fadeAndRedirect);
});