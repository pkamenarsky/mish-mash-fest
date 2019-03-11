let svg = null;
let visible_layers = new Array(12).fill(3);

function setDisplay(layer, display) {
  svg.children[layer].style['display'] = display;
}

const layers = [
  '_x31__x5F_',
  '_x32__x5F_',
  '_x33__x5F_',
  '_x34__x5F_',
  '_x35__x5F_',
  '_x36__x5F_',
  '_x37__x5F_',
  '_x38__x5F_',
  '_x39__x5F_',
  '_x31_0_x5F_',
  '_x31_1_x5F_',
  '_x31_2_x5F_'
];

function toLayer(e, frame) {
  return layers[e] + frame;
}

function updateLayers() {
  for (let i = 0; i < 12; i++) {
    for (let j = 1; j <= 5; j++) {
      setDisplay(toLayer(i, j), 'none');
    }
  }

  for (let i = 0; i < 12; i++) {
    setDisplay(toLayer(i, visible_layers[i]), 'unset');
  }
}

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
      // visible_layers[x + y * 4] *= xlerp(t, b, nY);
      // visible_layers[x + y * 4] = Math.round(Math.sqrt(visible_layers[x + y * 4]));
      visible_layers[x + y * 4] = Math.round(Math.max(xlerp(t, b, nY), visible_layers[x + y * 4]));
    }
  }
}

function normalize(s, e, v) {
  return (Math.max(s, Math.min(e, v)) - s) / (e - s);
}

function run() {
  svg = document.getElementById('svg');

  computeLayers(0, 0);
  updateLayers();

  window.addEventListener('deviceorientation', function(event) {
    const posX = normalize(-20, 20, event.gamma);
    const posY = normalize(10, 40, event.beta);

    computeLayers(posX, posY);
    displayLayers();
    updateLayers();

    // let e = document.getElementById('posx');
    // e.innerHTML = posX;

    // e = document.getElementById('posy');
    // e.innerHTML = posY;

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
