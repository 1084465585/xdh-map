(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40295ad7"],{"307e":function(t){t.exports={type:"FeatureCollection",features:[{type:"Feature",properties:{stroke:"#555555","stroke-width":2,"stroke-opacity":1,fill:"#555555","fill-opacity":.5,name:"a1"},geometry:{type:"Polygon",coordinates:[[[113.31908226013184,23.129783597745387],[113.31951141357422,23.122916390445305],[113.32732200622559,23.122837454984705],[113.32852363586424,23.127020970404175],[113.31908226013184,23.129783597745387]]]}},{type:"Feature",properties:{stroke:"#555555","stroke-width":2,"stroke-opacity":1,fill:"#555555","fill-opacity":.5,name:"b1"},geometry:{type:"Polygon",coordinates:[[[113.3213996887207,23.106970484867855],[113.31418991088867,23.10247055501927],[113.31951141357422,23.09931261948516],[113.3243179321289,23.101523182154658],[113.3228588104248,23.10389160178689],[113.3213996887207,23.106970484867855]]]}},{type:"Feature",properties:{stroke:"#555555","stroke-width":2,"stroke-opacity":1,fill:"#555555","fill-opacity":.5,name:"a2"},geometry:{type:"Polygon",coordinates:[[[113.32818031311035,23.120864053378302],[113.32826614379883,23.11565413370351],[113.34611892700195,23.11344380365309],[113.34629058837889,23.119916810298935],[113.32818031311035,23.120864053378302]]]}},{type:"Feature",properties:{stroke:"#555555","stroke-width":2,"stroke-opacity":1,fill:"#555555","fill-opacity":.5,name:"b2"},geometry:{type:"Polygon",coordinates:[[[113.34611892700195,23.107523097435966],[113.34603309631348,23.101838973851994],[113.35049629211426,23.101444234114318],[113.35066795349121,23.106812595144962],[113.34611892700195,23.107523097435966]]]}}]}},"387c":function(t,e,i){},4391:function(t,e,i){"use strict";var s=i("ec45"),a=i.n(s);a.a},"489e":function(t,e,i){"use strict";var s=i("387c"),a=i.n(s);a.a},7445:function(t,e,i){var s=i("63b6"),a=i("5d6b");s(s.G+s.F*(parseInt!=a),{parseInt:a})},b9e9:function(t,e,i){i("7445"),t.exports=i("584a").parseInt},c54f:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("example",[i("xdh-map",{ref:"map",attrs:{zoom:12,center:[113.4,23.06]},on:{ready:t.mapReady,click:t.featureClickHandle}},[i("xdh-map-geo",{ref:"geo",attrs:{state:t.state,"draw-define":t.drawDefineFn}}),i("xdh-map-placement",{attrs:{placement:"left-top",margin:[10,10],theme:"light"}},[i("div",{staticStyle:{padding:"10px",cursor:"pointer"},on:{click:t.toEdit}},[t._v(t._s(t.editing?"保存编辑":"编辑"))])]),i("xdh-map-placement",{attrs:{placement:"right-top",margin:[10,10],theme:"light"}},[i("div",{staticStyle:{padding:"10px",cursor:"pointer"},on:{click:t.toAdd}},[t._v(t._s(t.adding?"保存添加":"添加"))])]),i("xdh-map-placement",{attrs:{placement:"left-bottom",margin:[10,10],theme:"light"}},[i("div",{staticStyle:{padding:"10px",cursor:"pointer"},on:{click:t.saveJson}},[t._v("导出")])]),i("xdh-map-placement",{attrs:{placement:"right-bottom",margin:[10,10],theme:"light"}},[i("div",{staticClass:"edit-btn-wrap clearfix"},[i("div",{staticClass:"edit-btn",attrs:{title:"添加"}},[i("span",{staticClass:"iconfont"},[t._v("")])]),i("div",{staticClass:"edit-btn",attrs:{title:"编辑"}},[i("span",{staticClass:"iconfont"},[t._v("")])]),i("div",{staticClass:"edit-btn",attrs:{title:"导出"}},[i("span",{staticClass:"iconfont"},[t._v("")])])])]),i("xdh-map-draw",{ref:"polygon",attrs:{type:"Polygon"},on:{drawstart:t.drawStartHandle,drawend:t.addDrawEnd}}),i("edit-popup",{attrs:{position:t.popupCenter,offset:[0,0],show:t.popupShow,target:t.editTarget},on:{"on-save":t.propertiesSaveHandle}})],1)],1)},a=[],o=(i("7f7f"),i("20d6"),i("f499")),r=i.n(o),n=(i("ac6a"),i("6c7b"),i("e814")),d=i.n(n),l=function(t){var e=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,i=t.toLowerCase();if(i&&e.test(i)){if(4===i.length){for(var s="#",a=1;a<4;a+=1)s+=i.slice(a,a+1).concat(i.slice(a,a+1));i=s}for(var o=[],r=1;r<7;r+=2)o.push(d()("0x"+i.slice(r,r+2)));return"RGB("+o.join(",")+")"}return i},p=i("307e"),c=i("3a0d"),u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("xdh-map-popup",{ref:"popup",attrs:{position:t.position,offset:t.offset,title:"属性编辑","close-on-click":!1,width:"300px"}},[i("div",{staticClass:"properties-table"},[i("div",{staticClass:"head row"},[i("div",{staticClass:"label"},[t._v("属性")]),i("div",{staticClass:"value"},[t._v("值")])]),i("div",{staticClass:"body"},[t._l(t.editProp,function(e,s){return i("div",{key:s,staticClass:"row"},[i("div",{staticClass:"label"},[t._v(t._s(s))]),i("div",{staticClass:"value"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.editKey!==s,expression:"editKey !== key"}],class:{show:!0,changed:e!==t.target.properties[s]},on:{click:function(e){return t.setEdit(s)}}},[t._v(t._s(e))]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.editKey===s,expression:"editKey === key"}],staticClass:"edit"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.editProp[s],expression:"editProp[key]"}],attrs:{type:"text"},domProps:{value:t.editProp[s]},on:{blur:function(e){t.editKey=""},input:function(e){e.target.composing||t.$set(t.editProp,s,e.target.value)}}})])])])}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isAdd,expression:"isAdd"}],staticClass:"row"},[i("div",{staticClass:"label"},[i("div",{staticClass:"edit"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.addItem["key"],expression:"addItem['key']"}],attrs:{type:"text"},domProps:{value:t.addItem["key"]},on:{blur:t.addItemBlur,input:function(e){e.target.composing||t.$set(t.addItem,"key",e.target.value)}}})])]),i("div",{staticClass:"value"},[i("div",{staticClass:"edit"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.addItem["value"],expression:"addItem['value']"}],attrs:{type:"text"},domProps:{value:t.addItem["value"]},on:{blur:t.addItemBlur,input:function(e){e.target.composing||t.$set(t.addItem,"value",e.target.value)}}})])])])],2)]),i("div",{staticClass:"btn-wrap"},[i("button",{staticClass:"add",on:{click:t.addHandle}},[t._v("添加")]),i("button",{staticClass:"save",on:{click:t.saveHandle}},[t._v("保存")])])])},f=[],h=(i("7514"),i("5176")),m=i.n(h),v=["stroke","stroke-width","stroke-opacity","fill","fill-opacity"],y={name:"EditPopup",props:{position:{type:Array,default:function(){return[0,0]}},offset:{type:Array,default:function(){return[0,0]}},show:{type:Boolean,default:!1},target:{type:Object,default:function(){return{geometry:null,properties:{}}}}},data:function(){return{editProp:m()({},this.target.properties),editKey:"",addItem:{key:"",value:""},isAdd:!1}},computed:{},watch:{target:function(t){this.editProp=m()({},t.properties)},show:function(t){t?this.$refs.popup.show():this.$refs.popup.hide()}},methods:{setEdit:function(t){v.find(function(e){return e===t})||(this.editKey=t)},addItemBlur:function(){this.addItem.key&&this.addItem.value&&(this.editProp[this.addItem.key]=this.addItem.value,this.addItem.key="",this.addItem.value="",this.isAdd=!1)},addHandle:function(){this.isAdd=!0},saveHandle:function(){this.$emit("on-save",{id:this.target.id,geometry:this.target.geometry,properties:this.editProp}),this.$refs.popup.hide()}},created:function(){},mounted:function(){this.show||this.$refs.popup.hide()},beforeDestroy:function(){}},g=y,w=(i("489e"),i("2877")),k=Object(w["a"])(g,u,f,!1,null,"38de254c",null),b=k.exports,x=function(t){var e=l(t["fill"]),i=e.substring(0,e.length-1)+",".concat(t["fill-opacity"],")"),s=l(t["stroke"]),a=s.substring(0,s.length-1)+",".concat(t["stroke-opacity"],")");return Object(c["b"])({className:"Style",fill:{className:"Fill",color:i},stroke:{className:"Stroke",color:a,width:t["stroke-width"]}})},C={components:{EditPopup:b},data:function(){return{map:null,state:p,editing:!1,editPol:[],adding:!1,popupCenter:[0,0],popupShow:!1,editTarget:{geometry:null,properties:{}}}},methods:{toEdit:function(){this.adding=!1,this.$refs.polygon.finish(),this.editing?(this.$refs.polygon.finish(),this.saveEdit(this.editPol)):this.$refs.polygon.modify(),this.editing=!this.editing},saveEdit:function(t){var e=this.state.features;t.forEach(function(t,i){var s=t.getGeometry().getCoordinates(),a=e[i].geometry;a.coordinates=s})},toAdd:function(){this.editing=!1,this.$refs.polygon.finish(),this.saveEdit(this.editPol),this.adding?this.$refs.polygon.finish():this.$refs.polygon.draw(),this.adding=!this.adding},saveJson:function(){console.log(r()(this.state))},drawStartHandle:function(t){console.log(t)},addDrawEnd:function(t){this.editPol.push(t.feature),this.state.features.push({type:"Feature",properties:{stroke:"#555555","stroke-width":2,"stroke-opacity":1,fill:"#555555","fill-opacity":.5},geometry:{type:"Polygon",coordinates:t.feature.getGeometry().getCoordinates()}})},featureClickHandle:function(t){var e=this.$refs.map.getFeatureAtPixel(t.pixel);e&&(this.popupShow=!0,this.popupCenter=e.getGeometry().getInteriorPoint().getCoordinates(),this.editTarget=e.getProperties())},propertiesSaveHandle:function(t){var e=this.editPol.findIndex(function(e){return e.ol_uid===t.id});this.editPol[e].set("properties",t.properties),this.state.features[e].properties=t.properties},setActiveStyle:function(t){return Object(c["b"])({className:"Style",fill:{className:"Fill",color:"pink"},stroke:{className:"Stroke",color:"yellow",width:2},text:{className:"Text",text:t.properties.name,font:"14px sans-serif",fill:{className:"Fill",color:"blue"}}})},drawDefineFn:function(t,e){var i=t.clone();i.set("properties",e.properties),i.set("id",i.ol_uid),i.setStyle(x(e.properties)),this.$refs.map.addFeature(i),this.$refs.polygon.addFeatures([i]),this.editPol.push(i),t.setStyle(Object(c["b"])({className:"Style",fill:{className:"Fill",color:"transparent"},stroke:{className:"Stroke",color:"transparent",width:1}}))},mapReady:function(t,e){this.map=t}},mounted:function(){}},P=C,I=(i("4391"),Object(w["a"])(P,s,a,!1,null,"520925ca",null));e["default"]=I.exports},e814:function(t,e,i){t.exports=i("b9e9")},ec45:function(t,e,i){}}]);
//# sourceMappingURL=chunk-40295ad7.b3ebc460.js.map