<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-09-14 13:13:18
 * @LastEditors: Please set LastEditors
 -->
<template>
    <example>
      <div style="margin-bottom: 10px">
        <div ref="thing" draggable="true" style="width: 50px; height: 50px; background: red"></div>
      </div>
      <div class="map-warp" style="width: 100%; height: 500px;">
        <xdh-map :zoom="16" :center="[120.2014, 30.2574]" ref="map" >
        
        </xdh-map>
      </div>
      
    </example>
</template>

 
<script>

// import {defaults as defaultInteractions, Pointer as PointerInteraction} from 'ol/interaction.js'
// const Drag = (function (PointerInteraction) {
//   function Drag() {
//     PointerInteraction.call(this, {
//       handleDownEvent: handleDownEvent,
//       handleDragEvent: handleDragEvent,
//       handleMoveEvent: handleMoveEvent,
//       handleUpEvent: handleUpEvent
//     });

//     /**
//      * @type {module:ol/pixel~Pixel}
//      * @private
//      */
//     this.coordinate_ = null;

//     /**
//      * @type {string|undefined}
//      * @private
//      */
//     this.cursor_ = 'pointer';

//     /**
//      * @type {module:ol/Feature~Feature}
//      * @private
//      */
//     this.feature_ = null;

//     /**
//      * @type {string|undefined}
//      * @private
//      */
//     this.previousCursor_ = undefined;
//   }

//   if (PointerInteraction) Drag.__proto__ = PointerInteraction;
//   Drag.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
//   Drag.prototype.constructor = Drag;

//   return Drag;
// }(PointerInteraction))


export default {
  directives: {},
  data() {
    return {
    }
  },
  watch: {
    
  },
  methods: {
    
  },
  mounted() {
    // this.$refs.thing.addEventListener('drop', () => {
    //   console.log('ec')
    // })
  }
}
</script>

