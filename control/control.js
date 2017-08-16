(function() {
  var L = window.L;
  L.Control.ExampleControl = L.Control.extend({
    _active: false,
    _map: null,
    _button: null,
    _container: null,
    _pane: null,
    _box: null,

    includes: L.Evented,

    onAdd: function(map) {
      this._map = map;
      this._pane = this._map._panes.overlayPane;
      this._container = L.DomUtil.create('div', 'leaflet-example-control leaflet-bar deactivate');
      this._addBtn();

      return this._container;
    },

    _addBtn() {
      this._button = L.DomUtil.create('a');
      this._button.href = '#';
      this._button.innerHTML = '★';
      this._button.title = 'Example control - Let`s Click!';

      L.DomEvent
        .on(this._button, 'click', L.DomEvent.stopPropagation, this)
        .on(this._button, 'click', L.DomEvent.preventDefault, this)
        .on(this._button, 'click', this._toggle, this);

      this._container.appendChild(this._button);
    },

    activate: function() {
      this._active = true;
      this._map._container.style.cursor = 'pointer';
      L.DomUtil.removeClass(this._container, 'deactivate');
      L.DomEvent.on(document, 'click', this._onClick, this);
      this._tooltip = L.DomUtil.create('div', 'leaflet-example-tooltip', document.body);
      this._tooltip.innerHTML = 'Click on map!';
    },

    deactivate: function() {
      this._active = false;
      this._box && this._pane.removeChild(this._box);
      this._box = null;
      this._map._container.style.cursor = 'auto';
      L.DomUtil.addClass(this._container, 'deactivate');
      L.DomEvent.off(document, 'click', this._onClick, this);
      L.DomUtil.remove(this._tooltip);
    },

    _toggle(e) {
      if (this._active) {
        this.deactivate();
      } else {
        this.activate();
      }
    },

    _onClick: function(e) {
      const position = {
        x: e.x,
        y: e.y
      };

      this._box && this._pane.removeChild(this._box);
      this._box = L.DomUtil.create('div', 'box-example-pane', this._pane);
      this._box.innerHTML = 'Yep!';

      L.DomUtil.setPosition(this._box, position);
      this._map.fire('exampleControl:click', position); // fireEvent for example
    }
  });

  L.control.ExampleControl = function(options) {
    return new L.Control.ExampleControl(options);
  };

})();



