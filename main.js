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

function displayLayers() {
  const e = document.getElementById('layers');
  let str = '';

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 4; x++) {
      str += visible_layers[x + y * 4] + ' ';
    }

    str += '<br>';
  }

  e.innerHTML = str;
}

function displayLayersConsole() {
  for (let y = 0; y < 3; y++) {
    let str = '';
    for (let x = 0; x < 4; x++) {
      str += visible_layers[x + y * 4] + ' ';
    }

    console.log(str);
  }
}

function xlerp(a, b, f) {
  return (b - a) * f + a;
}

function computeLayers(posX, posY) {
  const l = xlerp(5, 1, posX);
  const r = xlerp(1, 5, posX);
  const t = xlerp(5, 1, posY);
  const b = xlerp(1, 5, posY);

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 4; x++) {
      const nX = x / 3.0, nY = y / 2.0;
      visible_layers[x + y * 4] = xlerp(l, r, nX);
    }
  }

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 4; x++) {
      const nX = x / 3.0, nY = y / 2.0;
      visible_layers[x + y * 4] *= xlerp(t, b, nY);
      visible_layers[x + y * 4] = Math.round(Math.sqrt(visible_layers[x + y * 4]));
    }
  }
}

function run() {
  window.addEventListener('deviceorientation', function(event) {
    // visible_layer = Math.round((event.beta - 50) / -2) + 3;
    // visible_layer = Math.min(7, Math.max(0, visible_layer));
    // updateLayers();

    const posX = (Math.max(-10, Math.min(10, event.gamma)) + 10) / 20;
    const posY = (Math.max(20, Math.min(50, event.beta)) - 20) / 30;

    computeLayers(posX, posY);
    displayLayers();

    let e = document.getElementById('posx');
    e.innerHTML = posX;

    e = document.getElementById('posy');
    e.innerHTML = posY;

    // let e = document.getElementById('alpha');
    // e.innerHTML = event.alpha;

    // 20 - 50
    // e = document.getElementById('beta');
    // e.innerHTML = event.beta;

    // -20 - 20
    // e = document.getElementById('gamma');
    // e.innerHTML = event.gamma;
  });
}

run();
