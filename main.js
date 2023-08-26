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
