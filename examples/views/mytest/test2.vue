<template>
  <example>
    <div style="height: 400px" id="map" class="map">
      
    </div>  
    <div>
      <button @click="test">test</button>
    </div>
  </example>
</template>
<style scoped lang="scss">
 
 
</style>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View'; 
import TileLayer from 'ol/layer/Tile'; 
import TileGrid from 'ol/tilegrid/TileGrid'
import {get as getProj} from 'ol/proj'
import TileImage from 'ol/source/TileImage'

import OlPlot from 'ol-plot'

export default {
  
  data() {
    return { 
      map: null,
      view: null,  
      zoom: 7,
      target: [113, 23],
      plot: null
    }
  },
  computed: {
      
  },
  methods: { 
    test() {
      this.plot.plotDraw.active('Circle')
    }
    
  },
  created() { 
   
  },
  mounted() {
    const projection = getProj('EPSG:4326') //   
    console.log('projection', projection)
    const tileGrid = new TileGrid({
      origin: [0, 0],
      resolutions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
      .map(function (x) {
        return Math.pow(2, 18 - x)
      })
    })
    const source = new TileImage({
      // projection: projection,
      extent: projection.getExtent(),
      tileGrid: tileGrid,
      tileUrlFunction: function (tileCoord) {
        let z = tileCoord[0];
        let x = tileCoord[1];
        let y = -tileCoord[2];
        const index = Math.ceil(Math.random() * 5)
        if (x < 0) {
          x = 'M' + (-x);
        }
        if (y < 0) {
          y = 'M' + (-y);
        } 
        return `http://online${index}.map.bdimg.com/onlinelabel/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20160426&scaler=1&p=0`
      }
    }) 
    
    var tileLayer = new TileLayer({
      source: source
    });

    let map = new Map({
      layers: [tileLayer],
      target: 'map',
      view: new View({
        center: [113.38542938232422, 23.040218353271484],
        zoom: 2
      })
    });

    this.plot = new OlPlot(map, {
      zoomToExtent: true
    }) 

    this.plot.plotDraw.on('drawEnd', (e) => {
      let feature = e.feature
      this.plot.plotEdit.activate(feature)
    })
  },
  beforeDestroy() {
     
  }
}
</script>


