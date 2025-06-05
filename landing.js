const video = document.getElementById("landing-video");

function goToMain() {
  video.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "project-archive/index.html";
  }, 1000);
}

video.addEventListener("ended", goToMain);
document.addEventListener("click", goToMain);

window.addEventListener("touchstart", () => {
  video.play().catch(() => {});
}, { once: true });

function tryPlay() {
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Autoplay prevented:", error);
    });
  }
}

video.addEventListener("canplay", tryPlay);
document.addEventListener("DOMContentLoaded", tryPlay);
