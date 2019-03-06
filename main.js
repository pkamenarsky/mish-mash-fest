window.addEventListener('deviceorientation', function(event) {
  document.getElementById('centered').style.fontVariationSettings = '"wght" ' + event.beta * 10;
});

let layer = 1;

function morphForLayer(layer) {
  return polymorph.interpolate(['#vertical #Layer_' + layer + ' path', '#vertical #Layer_' + (layer + 1) + ' path'], {
    origin: { x: 0, y: 0 },
    optimize: 'none',
    precision: 5
  });
}

function morphForLayer2(layer) {
  const e = document.getElementById('vertical');
  const p1 = e.children[layer].children[0].getAttribute('d');
  const p2 = e.children[layer + 1].children[0].getAttribute('d');
  return flubber.interpolate(p1, p2, {
    maxSegmentLength: 0.5
  });
}

let morph = morphForLayer2(layer);

const target = document.getElementById('target');

let t = 0;

const timer = setInterval(() => {
  t += 0.3;

  if (t > 1.0) {
    layer++;

    if (layer <= 6) {
      t = 0.0;
      morph = morphForLayer2(layer);
    }
    else {
      clearInterval(timer);
    }
  }
  else {
    target.setAttribute('d', morph(t));
  }
}, 10);
