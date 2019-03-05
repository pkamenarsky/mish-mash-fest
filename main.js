window.addEventListener('deviceorientation', function(event) {
  document.getElementById('centered').style.fontVariationSettings = '"wght" ' + event.beta * 10;
});
