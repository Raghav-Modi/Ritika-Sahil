const motionButton = document.querySelector('#motion');
motionButton.addEventListener('click', () => {
  const paused = document.documentElement.classList.toggle('motion-paused');
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Resume decorative animation' : 'Pause decorative animation');
  motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
});
const dialog = document.querySelector('#lightbox');
const titles = ['A walk to remember', 'Our kind of happiness', 'Always, hand in hand'];
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + titles.length) % titles.length;
  document.querySelector('.enlarged-photo').style.backgroundPosition = `${currentPhoto * 50}% 50%`;
  document.querySelector('.enlarged-photo').setAttribute('aria-label', titles[currentPhoto] + ' — sample pre-wedding photograph');
  document.querySelector('#lightbox-title').textContent = titles[currentPhoto];
  document.querySelector('#photo-count').textContent = `${currentPhoto + 1} / ${titles.length}`;
}
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  showPhoto(Number(button.dataset.photo));
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('#close-gallery').addEventListener('click', () => dialog.close());
document.querySelector('#previous').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#next').addEventListener('click', () => showPhoto(currentPhoto + 1));
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); }
});
