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
  const screenHeight = window.innerHeight || document.documentElement.clientHeight;
  const screenCenter = screenHeight / 2;
  names.forEach(el => {
    const center = el.getBoundingClientRect().top + el.clientHeight / 2;
    const distance = Math.abs(screenCenter - center);
    updateInfo(el, distance);
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
