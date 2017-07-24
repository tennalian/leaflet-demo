(function() {
  const latlngs = [[54.71331716, 20.50177574], [54.71123468, 20.50898552], [54.7027053, 20.50555229]];

  class Map {
    constructor() {
      this.map = {};
      this.index = 1;
      this.animate = null;
      this.circle = null;
      this.fx = {};
      this.stop = true;
    }

    init() {
      this.map = L.map('map', {
        zoom: 15,
        center: [54.71331716, 20.50177574]
      });

      L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: '&copy; <span>MapBox</span>'
      }).addTo(this.map);

      this.addMarkers();
      this.initAnimation();
    }

    addMarkers() {
      let markersLayer = [];
      latlngs.forEach(latlng => {
        let marker = L.marker(latlng);
        markersLayer.push(marker);
      })
      let layer = L.layerGroup(markersLayer).addTo(this.map);
    }

    initAnimation() {
      const self = this;
      const icon = L.divIcon({className: 'circle'});
      this.circle = L.marker([54.71331716, 20.50177574], {icon}).addTo(this.map)
      this.circle.addTo(this.map);

      this.index = 1;
      this.animate = document.querySelector('.circle')
      this.fx = new L.PosAnimation();
      this.runAnimation();
      this.stop = false;

      this.fx.on('end', () => {
        return self.updateTarget.apply(this);
      });
    }

    updateTarget() {
      if (!this.stop) {
        this.index ++;
        if (this.index > 2) {
          this.index = 0;
        }
        this.runAnimation();
      }
    }

    stopAnimation() {
      this.stop = true;
      this.fx.stop();
    }

    runAnimation() {
      const point = this.getPoint(latlngs[this.index]);
      this.stop = false;
      this.fx.run(this.animate, point, 5, 1);
    }

    destroyAnimation() {
      this.stopAnimation();
      this.circle.remove();
    }

    getPoint(item) {
      return this.map.latLngToLayerPoint(L.latLng(item[0], item[1]));
    }

    animation(){
      return this.animate;
    }

  }

  const map = new Map();
  map.init();
  const stopBtn = document.querySelector('.stop');
  const startBtn = document.querySelector('.start');

  stopBtn.addEventListener('click', () => {
    map.animation() && map.stopAnimation();
  });

  startBtn.addEventListener('click', () => {
    map.animation() && map.runAnimation();
  });

})();