$(function () {
  var e = $('#doot'), 
      q = e.find('img').first(),
      t = q.attr('src') + '?' + (new Date).getTime(),
      w = function (e) {
        e.preventDefault();
        var n = $('audio')[0];
        n.pause(); n.currentTime = 0; n.play();
        q.attr('src', t);
        ga('send', 'event', 'button', 'click', 'tumpet');
        return false; }; 
  q.attr('src', t);
  e.click(w); });