(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1081:function(o,n,i){"use strict";i.r(n);var t=i(146),e={components:{XdhMap:t.c,XdhMapPanel:t.u,XdhMapIcon:t.o},data:function(){return{position1:[119.4,29.6],position2:[120,30],visible:!0}},methods:{panelHandle:function(){this.panelClose=!this.panelClose},panelClosedHandle:function(){console.log("panel close")}}},s=(i(763),i(16)),a=Object(s.a)(e,function(){var o=this,n=o.$createElement,i=o._self._c||n;return i("div",{staticStyle:{height:"500px"}},[i("xdh-map",[i("xdh-map-panel",{key:"panel_1",attrs:{position:o.position1,height:"auto",visible:o.visible}},[i("button",{on:{click:function(n){o.visible=!1}}},[o._v("关闭")]),o._v("\n      点击按钮关闭，点击icon 打开  \n    ")]),o._v(" "),i("xdh-map-icon",{key:"icon_1",staticClass:"icon",attrs:{icon:"iconfont icon-locus",position:o.position1},on:{click:function(n){o.visible=!0}}}),o._v(" "),i("xdh-map-panel",{key:"panel_2",staticClass:"custom-panel",attrs:{position:o.position2,height:"auto",visible:o.visible}},[i("div",{staticClass:"custom-panel__body"},[i("div",[o._v("可自定义样式：")]),o._v(" "),i("pre",[o._v("                /deep/ .xdh-map-panel {\n                  border-bottom: 1px solid green;\n                  .box{ border-color: green; background: red;}\n                  .bottom-pin:after{border-bottom-color: red;}\n                }\n          ")])])]),o._v(" "),i("xdh-map-icon",{key:"icon_2",staticClass:"icon",attrs:{icon:"iconfont icon-locus",position:o.position2}})],1)],1)},[],!1,null,"2de84169",null);n.default=a.exports},452:function(o,n,i){},763:function(o,n,i){"use strict";var t=i(452);i.n(t).a}}]);