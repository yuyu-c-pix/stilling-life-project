document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("landing-video");

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
  document.addEventListener("click", () => {
    video.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "project-archive/index.html";
    }, 1000);
  });

  video.addEventListener("ended", () => {
    video.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "project-archive/index.html";
    }, 1000);
  });
});
