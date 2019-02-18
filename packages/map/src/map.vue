<template>
  <div class="xdh-map" ref="map"></div>
</template>

<script>
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';

  export default {
    name: 'XdhMap',
    mounted() {
      new Map({
        layers: [new TileLayer({
          source: new OSM()
        })],
        target: this.$refs.map,
        overlays: [],
        view: new View({
          projection: 'EPSG:4326',
          center: [120, 30],
          zoom: 4
        })

      });
    }
  }
</script>

