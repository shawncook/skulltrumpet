const dooter = document.querySelector('#doot');
const goodBones = dooter.querySelector('img');
const uniqueSrc = goodBones.getAttribute('src') + '?' + (new Date).getTime();

goodBones.setAttribute('src', uniqueSrc);

function onDoot(event) {
  event.preventDefault();
  const doot = document.querySelector('audio');
  doot.pause();
  doot.currentTime = 0;
  doot.play();
  goodBones.setAttribute('src', uniqueSrc);
  ga('send', 'event', 'button', 'click', 'tumpet');
  return false;
}

dooter.addEventListener('click', (event) => onDoot(event));
