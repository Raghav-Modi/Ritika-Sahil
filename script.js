const motionButton = document.querySelector('#motion');
motionButton.addEventListener('click', () => {
  const paused = document.documentElement.classList.toggle('motion-paused');
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Resume decorative animation' : 'Pause decorative animation');
  motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
});
const dialog = document.querySelector('#lightbox');
const galleryPhotos = Array.from(document.querySelectorAll('.gallery .photo-art'));
const titles = galleryPhotos.map((photo, index) => `Photograph ${index + 1}`);
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + titles.length) % titles.length;
  const enlargedPhoto = document.querySelector('.enlarged-photo');
  enlargedPhoto.src = galleryPhotos[currentPhoto].src;
  enlargedPhoto.alt = galleryPhotos[currentPhoto].alt;
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

// Deterministic placement keeps the decorations stable between page loads.
document.querySelectorAll('.hero, .welcome, .celebrations, .gallery-section, .blessings, #envelope-screen').forEach((section, sectionIndex) => {
  const layer = document.createElement('div');
  layer.className = 'star-layer';
  layer.setAttribute('aria-hidden', 'true');
  const count = section.classList.contains('hero') ? 28 : 12;
  for (let index = 0; index < count; index++) {
    const star = document.createElement('span');
    star.className = 'floating-star';
    star.textContent = index % 3 === 0 ? '✧' : '✦';
    // Keep most of the hero's ornaments to the sides of the invitation.
    const left = sectionIndex === 0
      ? (index % 2 ? 77 + (index * 7 % 20) : 3 + (index * 7 % 20))
      : 3 + (index * 31 + sectionIndex * 13) % 94;
    star.style.left = `${left}%`;
    star.style.top = `${8 + (index * 19 + sectionIndex * 11) % 83}%`;
    star.style.fontSize = `${12 + index * 7 % 25}px`;
    star.style.setProperty('--star-duration', `${12 + index % 11}s`);
    star.style.setProperty('--star-delay', `${-(index * 3 % 19)}s`);
    star.style.setProperty('--star-opacity', sectionIndex === 0 ? '.26' : '.13');
    layer.append(star);
  }
  section.prepend(layer);
});

const backgroundMusic = document.querySelector('#background-music');
const musicToggle = document.querySelector('#music-toggle');
const musicLabel = document.querySelector('#music-label');
const musicStatus = document.querySelector('#music-status');
backgroundMusic.volume = 0.28;
let musicPreference = null;
try { musicPreference = sessionStorage.getItem('wedding-music'); } catch (_) { /* Storage is optional. */ }
let playPending = false;
function rememberMusic(value) {
  musicPreference = value;
  try { sessionStorage.setItem('wedding-music', value); } catch (_) { /* Playback works without storage. */ }
}
function updateMusicControl() {
  const playing = !backgroundMusic.paused;
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Mute background music' : 'Play background music');
  musicLabel.textContent = playing ? 'Mute music' : 'Play music';
}
async function playMusic(explicit = false) {
  if (playPending || (musicPreference === 'off' && !explicit)) return;
  playPending = true;
  try {
    await backgroundMusic.play();
    if (musicPreference === 'off' && !explicit) {
      backgroundMusic.pause();
      return;
    }
    if (explicit) rememberMusic('on');
    musicStatus.textContent = 'Background music playing. Use Mute music to turn it off.';
  } catch (_) {
    // Autoplay restrictions are normal; leave a usable play button.
    if (explicit) musicStatus.textContent = 'Music could not start. Please tap Play music to try again.';
  } finally {
    playPending = false;
    updateMusicControl();
  }
}
musicToggle.addEventListener('click', () => {
  if (!backgroundMusic.paused || playPending) {
    rememberMusic('off');
    backgroundMusic.pause();
    musicStatus.textContent = 'Background music muted.';
    updateMusicControl();
  } else {
    playMusic(true);
  }
});
backgroundMusic.addEventListener('play', updateMusicControl);
backgroundMusic.addEventListener('pause', updateMusicControl);
backgroundMusic.addEventListener('error', () => {
  updateMusicControl();
  musicStatus.textContent = 'Background music is unavailable. You can still explore the invitation.';
});
// The envelope tap provides the browser gesture needed to start music.
const envelopeScreen = document.querySelector('#envelope-screen');
const invitationContent = document.querySelector('#invitation-content');
const openEnvelope = document.querySelector('#open-envelope');
let invitationOpened = false;
envelopeScreen.hidden = false;
invitationContent.inert = true;
document.documentElement.classList.add('envelope-closed');
openEnvelope.focus({ preventScroll: true });
envelopeScreen.addEventListener('click', () => {
  if (invitationOpened) return;
  invitationOpened = true;
  // Call play synchronously within this trusted click, before any animation wait.
  playMusic();
  envelopeScreen.classList.add('opening');
  openEnvelope.setAttribute('aria-disabled', 'true');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    envelopeScreen.hidden = true;
    invitationContent.inert = false;
    document.documentElement.classList.remove('envelope-closed');
    window.scrollTo(0, 0);
    const heading = document.querySelector('#couple-name');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }, reducedMotion ? 0 : 1100);
});
updateMusicControl();
