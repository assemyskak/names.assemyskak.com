function playVideo(el) {
  el.classList.add('playing');
  if (el.$video && el.$video.paused) {
    clearTimeout(el.$video.__resetTimer);
    el.$video.play();
  }
}

function pauseVideo(el) {
  el.classList.remove('playing');
  if (el.$video && !el.$video.paused) {
    el.__already_played = true;
    el.$video.pause();
    el.$video.__resetTimer = setTimeout(() => {
      el.$video.currentTime = 0;
    }, 1000);
  }
}

const DISTANCE = 150;

function updateInfo(el, distance) {
  if (!el.$info) {
    return;
  }
  const currentDistance = window.innerWidth >= 400 ? DISTANCE : DISTANCE / 2;

  const min = currentDistance / 2;
  const max = currentDistance * 2.5;
  if (distance <= min) {
    el.$info.style.opacity = 1;
    return;
  }
  if (distance > max) {
    el.classList.toggle('opened', false);
    el.$info.style.opacity = 0;
    return;
  }
  if (el.classList.contains('opened')) {
    el.$info.style.opacity = 1;
    return;
  }
  el.$info.style.opacity = 1 - (distance - min) / (max - min);
}

const names = document.querySelectorAll('.names .name');
names.forEach(el => {
  el.$info = el.querySelector('.info');
  el.$video = el.querySelector('video');
  el.$progress = el.querySelector('.progress');
  el.$video.addEventListener('timeupdate', e => {
    const percent = Math.ceil((e.target.currentTime / e.target.duration) * 100);
    el.$progress.style.width = `${percent}%`;
    if (percent > 60 && window.innerWidth < 1200) {
      el.classList.toggle('opened', true);
    }
    if (percent > 60) {
      pauseVideo(el);
    }
  });

  el.addEventListener('mousedown', e => {
    e.preventDefault();
    if (window.innerWidth >= 1200) {
      return;
    }
    if (el.$info) {
      el.classList.toggle('opened');
      if (el.classList.contains('opened')) {
        el.$info.style.opacity = 1;
        return;
      }
    }
  });
});

function onScroll() {
  // document.documentElement.classList.toggle('scrolled', window.scrollY > 500);
  const screenHeight = window.innerHeight || document.documentElement.clientHeight;
  const screenCenter = screenHeight / 2;
  names.forEach(el => {
    const center = el.getBoundingClientRect().top + el.clientHeight / 2;
    const distance = Math.abs(screenCenter - center);
    updateInfo(el, distance);
    const currentDistance = window.innerWidth >= 400 ? DISTANCE : DISTANCE / 2;
    if (distance <= currentDistance) {
      if (!el.__already_played) {
        playVideo(el);
      }
    } else {
      // reset
      el.__already_played = false;
      pauseVideo(el);
    }
  });
}
onScroll();

let timer = null;
addEventListener('scroll', e => {
  if (!timer) {
    timer = requestAnimationFrame(() => {
      onScroll();
      timer = null;
    });
  }
});
