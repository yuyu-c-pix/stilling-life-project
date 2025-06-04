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

