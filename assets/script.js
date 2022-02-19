(function Tumpet(){

  cooldown = false

  options = {
    doot: document.querySelector('audio'),
    dooter: document.getElementById('doot'),
    dootEl: document.querySelector('.doots'),
    toggle: document.querySelector('.toggle'),
    tipjar: document.getElementById('tipjar'),
  }

  flyoutToggle = (data) => {
    const expanded = data.toggle ?
      data.toggle.getAttribute('aria-expanded') : 'false'
    const isExpanded = expanded === 'true'
    gtag('event', 'click', {
      'event_category': 'flyout',
      'event_label': isExpanded ? 'close' : 'open'
    })
    data.tipjar.classList.toggle('open')
    data.toggle.setAttribute('aria-expanded', !isExpanded)
  }

  flyoutClose = (data) => {
    const expanded = data.toggle ?
      data.toggle.getAttribute('aria-expanded') : 'false'
    const isExpanded = expanded === 'true'
    if (options.toggle && isExpanded) flyoutToggle(options)
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
      gtag('event', 'click', {
        'event_category': 'button',
        'event_label': 'tumpet'
      })
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
      const msg = theVal === 420 ? 'blaze it' : 'nice'
      el.setAttribute('data-tooltip', msg)
      gtag('event', 'click', {
        'event_category': 'button',
        'event_label': 'doots',
        'value': theVal
      })
      setTimeout(() => {
        el.removeAttribute('data-tooltip')
      }, 2250)
    } else el.removeAttribute('data-tooltip')
  }

  handleKeyup = (evt, data) => {
    if (evt.keyCode == 32) { handleDoot(evt) }
    if (evt.keyCode == 27) { flyoutClose(data) }
  }

  bind = () => {
    document.body.onkeyup = (evt) => handleKeyup(evt, options)
    options.dooter.addEventListener('click', handleDoot)
    options.toggle.addEventListener('click', (evt) => flyoutToggle(options))
  }

  bind()
  setDoots()

})()
