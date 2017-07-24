(function() {
  const latlngs = [L.latLng(54.71331716, 20.50177574), L.latLng(54.71123468, 20.50898552), L.latLng(54.7027053, 20.50555229)];
  const map = L.map('map', {
    zoom: 15,
    // crs: L.CRS.Base,
    center: [54.71331716, 20.50177574]
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: '&copy; <span>MapBox</span>'
  }).addTo(map);

  var icon = L.divIcon({className: 'circle'});
  const circle = L.marker([54.71331716, 20.50177574], {icon}).addTo(map)
  circle.addTo(map);

  let animate = document.querySelector('.circle')
  var fx = new L.PosAnimation();

  let ltlng = latlngs[1];
  let point = getPoint(ltlng);
  console.log(point)

  fx.run(animate, L.point(200,300), 100);

  // fx.on('end', () => {
  //   console.log('finish')
  //   let index = Math.floor(Math.random() * latlngs.length);
  //   let point = getPoint(latlngs[index]);
  //   fx.run(animate, point, 100);
  // })

  function getPoint(item) {
    let zoom = map.getZoom();
    console.log(zoom)
    let point = L.CRS.EPSG3395.latLngToPoint(item, zoom);
    return point;
  }
})();