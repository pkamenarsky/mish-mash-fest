function setDisplay(layer, display) {
  const e = document.getElementById('vertical');
  e.children[layer].style['display'] = display;
}

let visible_layer = 0;

for (let i = 0; i <= 7; i++) {
  setDisplay(i, 'none');
}

setDisplay(visible_layer, 'unset');

window.addEventListener('deviceorientation', function(event) {
  setDisplay(visible_layer, 'none');
  visible_layer = Math.round((event.beta - 50) / -2) + 3;
  visible_layer = Math.min(7, Math.max(0, visible_layer));
  setDisplay(visible_layer, 'unset');

  // const e = document.getElementById('beta');
  // e.innerHTML = event.beta + ', ' + visible_layer;
});
