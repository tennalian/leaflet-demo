(function() {
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

  let ltlng = L.latLng(54.71331716, 20.50177574)
  let point = L.CRS.EPSG3857.latLngToPoint(ltlng)
  // console.log(L.CRS.project(ltlng))
  // fx.run(animate, point, 100);

  fx.on('end', () => {
    console.log('finish')
  })

})();