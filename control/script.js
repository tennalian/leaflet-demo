(function() {

  const tile = {
    id: 0,
    name: 'Спутник',
    layer: L.tileLayer('http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://maps.sputnik.ru/">Спутник</a>'
    })
  };

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

      this.tileLayer = tile.layer;
      this.tileLayer.addTo(this.map);
      this.layer.addTo(this.map);
      L.control.ExampleControl({position: 'topleft'}).addTo(this.map);
    }
  }

  let map = new Map('map');
  map.init();



})();