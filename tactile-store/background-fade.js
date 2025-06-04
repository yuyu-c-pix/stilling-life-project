const images = [
  'background1.png',
   'background2.png',
    'background3.png'
];

let index = 0;
let showingBg1 = true;

const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

function showNextBackground() {
  const nextImage = images[index];
  const nextIndex = (index + 1) % images.length;

  if (showingBg1) {
    bg2.style.backgroundImage = `url('${nextImage}')`;
    bg2.style.opacity = '1';
    bg1.style.opacity = '0';
  } else {
    bg1.style.backgroundImage = `url('${nextImage}')`;
    bg1.style.opacity = '1';
    bg2.style.opacity = '0';
  }

  showingBg1 = !showingBg1;
  index = nextIndex;
}

showNextBackground();
setInterval(showNextBackground, 2500);
