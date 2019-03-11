function setDisplay(layer, display) {
  const e = document.getElementById('vertical');
  e.children[layer].style['display'] = display;
}

let visible_layers = new Array(12).fill(2);

function toLayer(e, frame) {
  return e + '_' + frame;
}

function updateLayers() {
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j < 5; j++) {
      setDisplay(toLayer(i, j), 'none');
    }
  }

  for (let i = 0; i <= 12; i++) {
    setDisplay(toLayer(i, visible_layers[i]), 'unset');
  }
}

// updateLayers();

window.addEventListener('deviceorientation', function(event) {
  // visible_layer = Math.round((event.beta - 50) / -2) + 3;
  // visible_layer = Math.min(7, Math.max(0, visible_layer));
  // updateLayers();

  let e = document.getElementById('alpha');
  e.innerHTML = event.alpha;

  e = document.getElementById('beta');
  e.innerHTML = event.beta;

  e = document.getElementById('gamma');
  e.innerHTML = event.gamma;
});
