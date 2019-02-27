<template>
  <div>
    <example>
      <xdh-map :zoom="12" :center="center">
        <xdh-map-line :routes="routes"
                      stroke-color="blue"
                      :stroke-line-dash="[10]"
                      :stroke-width="4"></xdh-map-line>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  import {GreatCircle} from 'utils/plugins/Arc'

  const gen = new GreatCircle({x: 119, y: 30}, {x: 120, y: 31})
  const arcLine = gen.Arc(100, {offset: 0})
  console.log(arcLine.geometries[0].coords)
  export default {
    data() {
      return {
        coords: arcLine.geometries[0].coords,
        center: [120.000000, 30.186209],
        routes: [
          [119.960972, 30.246209],
          [119.975288, 30.235707],
          [119.979764, 30.235124],
          [120.039173, 30.243370],
          [120.057530, 30.217952],
          [120.058055, 30.216690],
          [120.054571, 30.207820],
          [120.052500, 30.193840],
          [120.054734, 30.185295],
          [120.073708, 30.166286],
          [120.081231, 30.160251]
        ]
      }
    }
  }
</script>

<style scoped>

</style>
