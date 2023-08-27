const onScroll = () => {
  console.log(Math.round(scrollY))
};

let timer = null;
addEventListener('scroll', () => {
  if (!timer) {
    timer = requestAnimationFrame(() => {
      onScroll();
      timer = null;
    });
  }
});

document.querySelectorAll('.names .name').forEach(el => {
  const video = el.querySelector('video');
  const progress = el.querySelector('.progress');
  el.addEventListener('mouseenter', () => video.play());
  el.addEventListener('mouseleave', () => video.pause());
  video.addEventListener('timeupdate', (e) => {
    progress.style.width = `${Math.ceil(e.target.currentTime / e.target.duration * 100)}%`;
  });
})

