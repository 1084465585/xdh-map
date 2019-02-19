<template>
  <div class="xdh-map" ref="map">
    <div class="xdh-map__inner"></div>
  </div>
</template>

<script>
  import Map from 'ol/Map';
  import View from 'ol/View';
  import {createLayer} from '../../../utils/layers'

  export default {
    name: 'XdhMap',
    mounted() {
      const layer = createLayer('Amap')
      const map = new Map({
        layers: [layer],
        target: this.$refs.map,
        overlays: [],
        view: new View({
          projection: 'EPSG:4326',
          center: [120, 30],
          zoom: 4
        })
      });
      map.on('pointermove', (e) => {
        console.log(e)
      })
    }
  }
</script>

