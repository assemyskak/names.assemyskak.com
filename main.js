const names = document.querySelectorAll('.names .name');
names.forEach(el => {
  el.$expand = el.querySelector('.expand');
  if (el.$expand) {
    el.$expand.addEventListener('mousedown', e => {
      if (e.button === 0 && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        el.classList.toggle('opened');
      }
    });
  }
});
