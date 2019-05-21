<template>
  <!-- 坐标转换 -->
  <example>
      <div class="desc">
          <p>国际经纬度坐标标准为WGS-84,国内必须至少使用国测局制定的GCJ-02,对地理位置进行首次加密。
          </p>
          <p>
              百度坐标在此基础上，进行了BD-09二次加密措施,更加保护了个人隐私
          </p>
          <p>
              如果数据源提供的坐标是加密后的坐标，需要在使用时进行坐标转换，此时需要设置xdh-map的coord-type参数，参数可选类型为:'WGS84' | 'GCJ02' | 'BD09',默认 'WGS84'
          </p>
      </div>
    <xdh-map class="float-map" :zoom="15">
           <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="dark">
        <div style="padding: 10px">转换前</div>
      </xdh-map-placement>
      <xdh-map-circle
        :position="[120, 30]"
        :radius="0.0005"
        :zoom="15"
        fill="blue"
        stroke-color="red"
        :stroke-width="5"
      ></xdh-map-circle>
      <xdh-map-scale></xdh-map-scale>
    </xdh-map>
    <xdh-map class="float-map"  :zoom="15" coord-type="BD09">
            <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="dark">
        <div style="padding: 10px">转换后</div>
      </xdh-map-placement>
      <xdh-map-circle
        :position="[120, 30]"
        :radius="0.0005"
        fill="blue"
        stroke-color="red"
        :stroke-width="5"
      ></xdh-map-circle>
      <xdh-map-scale></xdh-map-scale>
    </xdh-map>
  </example>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
.desc{
    text-indent: 2em;
}
.float-map{
    width: 45%;
    height: 50%;
    float:left;
    margin:15px;
    border: 2px solid #ccc;
}
</style>