(function() {
  const customIcon = L.icon({
    iconUrl: './icon.png',
    iconSize: [100, 100]
  });
  const latlngs = [[54.71331716, 20.50177574], [54.71123468, 20.50898552], [54.7027053, 20.50555229]];
  const options = [{
    id: 0,
    name: 'Marker',
    layer: L.marker([54.71331716, 20.50177574])
  }, {
    id: 1,
    name: 'Custom icon',
    layer: L.marker([54.71331716, 20.50177574], {icon: customIcon})
  }, {
    id: 2,
    name: 'Polyline',
    layer: L.polyline(latlngs, {
      weight: 4,
      opacity: 1,
      color: '#2196f3'
    })
  }, {
    id: 3,
    name: 'Polygone',
    layer: L.polygon(latlngs, {
      weight: 4,
      opacity: 1,
      color: '#07a64f'
    })
  }, {
    id: 4,
    name: 'Circle',
    layer: L.circle([54.71331716, 20.50177574], {
      radius: 2000,
      color: '#a60756',
    })
  }];

  const tiles = [{
    id: 0,
    name: 'Спутник',
    layer: L.tileLayer('http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://maps.sputnik.ru/">Спутник</a>'
    })
  }, {
    id: 1,
    name: 'MapBox',
    layer: L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      attribution: '&copy; <span>MapBox</span>'
    })
  }];


  class Map {
    constructor(id) {
      this.id = id;
      this.layer = L.layerGroup();
      this.tileLayer = L.tileLayer();
      this.map = {};
    }

    init() {
      this.map = L.map(this.id, {
        zoom: 15,
        center: [54.71331716, 20.50177574]
      });

      this.tileLayer = tiles[0].layer;
      this.tileLayer.addTo(this.map);
      this.layer.addTo(this.map);
    }

    drawItem(item) {
      console.log(item)
      this.map.removeLayer(this.layer);
      this.layer = L.layerGroup([item.layer]);
      this.layer.addTo(this.map);
    }

    removeItem(item) {
      this.map.removeLayer(this.layer);
    }

    changeTile(item) {
      this.map.removeLayer(this.tileLayer);
      this.tileLayer = item.layer;
      this.tileLayer.addTo(this.map);
    }
  }

  let map = new Map('map');
  map.init();

  const stuffsBlock = document.querySelector('.stuffs').querySelector('ul');
  const tilesBlock = document.querySelector('.tiles').querySelector('ul');

  options.forEach(stuff => {
    const li = document.createElement('li');
    const el = `
        <label>
          <input type="radio" name="stuffs" value="${stuff.id}"/>
          ${stuff.name}
        </label>`;
    li.innerHTML = el;
    stuffsBlock.appendChild(li);
  });

  tiles.forEach(tile => {
    const li = document.createElement('li');
    const el = `
        <label>
          <input type="radio" name="tiles" value="${tile.id}"/>
          ${tile.name}
        </label>`;
    li.innerHTML = el;
    tilesBlock.appendChild(li);
  });

  tilesBlock.querySelectorAll('input').forEach(el => {
    el.addEventListener('click', (e) => {
      let item = tiles.find(t => {
        return t.id == e.target.value;
      });
      map.changeTile(item);
    })
  });

  stuffsBlock.querySelectorAll('input').forEach(el => {
    el.addEventListener('click', (e) => {
      let item = options.find(s => {
        return s.id == e.target.value;
      });
      map.drawItem(item);
    })
  });

})();