(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{995:function(t,a,n){"use strict";n.r(a);var e=n(147),r={components:{XdhMap:e.c,XdhMapHeat:e.j},data:function(){return{data:[]}},methods:{getData:function(){for(var t=[],a=0;a<1e3;a++)t.push({lon:120+Math.random()-Math.random(),lat:30+Math.random()-Math.random(),weight:Math.random()});return t}},created:function(){this.data=this.getData()}},o=n(16),d=Object(o.a)(r,function(){var t=this.$createElement,a=this._self._c||t;return a("xdh-map",{attrs:{zoom:9}},[a("xdh-map-heat",{attrs:{data:this.data,radius:10}})],1)},[],!1,null,null,null);a.default=d.exports}}]);