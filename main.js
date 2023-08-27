function playVideo(el) {
  el.classList.add('playing')
  const video = el.querySelector('video');
  if (video.paused) {
    clearTimeout(video.__resetTimer);
    video.play();
  }
}

function pauseVideo(el) {
  el.classList.remove('playing')
  const video = el.querySelector('video');
  if (!video.paused) {
    video.pause();
    video.__resetTimer = setTimeout(() => {
      video.currentTime = 0;
    }, 1000)
  }
}


const names = document.querySelectorAll('.names .name');
names.forEach(el => {
  const video = el.querySelector('video');
  const progress = el.querySelector('.progress');
  video.addEventListener('timeupdate', (e) => {
    progress.style.width = `${Math.ceil(e.target.currentTime / e.target.duration * 100)}%`;
  });
})

function onScroll() {
  const screenHeight = window.innerHeight || document.documentElement.clientHeight;
  const screenCenter = screenHeight / 2;
  names.forEach(el => {
    const center = el.getBoundingClientRect().top + (el.clientHeight / 2);
    if (Math.abs(screenCenter - center) <= 100) {
      playVideo(el);
    } else {
      pauseVideo(el);
    }
  });
}

let timer = null;
addEventListener('scroll', () => {
  if (!timer) {
    timer = requestAnimationFrame(() => {
      onScroll();
      timer = null;
    });
  }
});
