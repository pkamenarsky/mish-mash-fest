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

function computeLayers(posX, posY) {
  const tl = 0;
  const tr = 0;
  const bl = 0;
  const br = 0;

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 4; x++) {
      const nX = x / 3.0, nY = y / 2.0;
      const dX = posX - nX, dY = posY - nY;
      const d = dX * dX + dY * dY;

      // 0.5 = everything 3
      // 1 = right 5, left 1
      // 0 = left 5, right 1
      visible_layers[x + y * 4] = d;
      // visible_layers[x + y * 4] = Math.round(d * 100);
      // visible_layers[x + y * 4] = Math.round(nX * 10) + ':' + Math.round(nY * 10);
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

computeLayers(0.5, 0.5);
displayLayersConsole();
