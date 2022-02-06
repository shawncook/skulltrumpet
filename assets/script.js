(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-47259602-1', 'skulltrumpet.com');
ga('send', 'pageview');

(function Tumpet(){

  cooldown = false

  options = {
    doot: document.querySelector('audio'),
    dooter: document.querySelector('#doot'),
    dootEl: document.querySelector('.doots')
  }

  playAudio = () => {
    options.doot.pause()
    options.doot.currentTime = 0
    options.doot.play()
  }

  playGif = () => {
    const img = options.dooter.querySelector('img')
    const gifSrc = img.getAttribute('src').split('?')[0]
    const newExt = gifSrc.replace('.png', '.gif')
    const newSrc = newExt + '?' + (new Date).getTime()
    img.src = newSrc
  }

  incrementDoots = () => {
    const value = localStorage.getItem('dootCounter')
    localStorage.setItem('dootCounter', parseInt(value) + 1)
    setDoots()
  }

  handleDoot = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (! cooldown) {
      cooldown = true
      const target = evt.currentTarget
      if (target) target.disabled = true
      ga('send', 'event', 'button', 'click', 'tumpet')
      playGif()
      playAudio()
      setTimeout(() => {
        incrementDoots()
        showNice()
        if (target) target.disabled = false
        cooldown = false
      }, 1000)
      return false
    }
  }

  setDoots = () => {
    const value = localStorage.getItem('dootCounter')
    const dootEl = options.dootEl
    if (null === value || isNaN(value)) {
      localStorage.setItem('dootCounter', 0)
    }
    options.dootEl.innerHTML = value
  }

  showNice = () => {
    const theVal = parseInt(localStorage.getItem('dootCounter'))
    const isNice = theVal == 420 || theVal == 69
    const el = options.dootEl
    if (0 > theVal) el.setAttribute('data-tooltip', 'umm')
    else if (isNice) {
      el.setAttribute('data-tooltip', 'nice')
      setTimeout(() => {
        el.removeAttribute('data-tooltip')
      }, 2250)
    } else el.removeAttribute('data-tooltip')
  }

  handleKeyup = (evt) => {
    if (evt.keyCode == 32) { handleDoot(evt) }
  }

  bind = () => {
    document.body.onkeyup = (evt) => handleKeyup
    options.dooter.addEventListener('click', handleDoot)
  }

  bind();
  setDoots();

})();


