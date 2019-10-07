<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-07 10:31:05
 * @LastEditTime: 2019-04-07 10:31:05
 * @LastEditors: your name
 -->
<template>
  <xdh-map-popup ref="popup" :position="position"
                  :offset="offset"
                  title="属性编辑"
                  :close-on-click="false"
                  width="300px">
    <div class="properties-table">
      <div class="head row">
        <div class="label">属性</div>
        <div class="value">值</div>
      </div>
      <div class="body">
        <div class="row" v-for="(val, key) in editProp" :key="key">
          <div class="label">{{key}}</div>
          <div class="value">
            <div :class="{'show': true, 'changed': val !== target.properties[key]}"
             @click="setEdit(key)" v-show="editKey !== key">{{val}}</div>
            <div class="edit" v-show="editKey === key">
              <input type="text" v-model="editProp[key]" @blur="editKey = ''" />
            </div>
          </div>
        </div>
        <div class="row" v-show="isAdd">
          <div class="label">
            <div class="edit">
              <input type="text" v-model="addItem['key']" @blur="addItemBlur" />
            </div>
          </div>
          <div class="value" >
            <div class="edit">
              <input type="text" v-model="addItem['value']" @blur="addItemBlur" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-wrap" >
      <button class="add" @click="addHandle">添加</button>
      <button class="save" @click="saveHandle">保存</button>
    </div>
  </xdh-map-popup> 
</template>
<style scoped lang="scss">
.properties-table{
  box-sizing: border-box;
  .row{
    display: flex;
    line-height: 1.8;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    .label{
      text-align: center;
      font-weight: bold;
      flex: 0 0 48%;
      border-right: 1px solid #f5f5f5;
      .edit{
        width: 99%;
        input{
          display: block;
          width: 95%;
        }
      }
    }
    .value{
      flex: 0 0 52%;
      padding-left: 3px;
      overflow: hidden;
      white-space:nowrap;
      text-overflow: ellipsis;
      .show, .edit{
        width: 99%;
        
        input{
          display: block;
          width: 95%;
        }
      }
      .show.changed{
        border: 1px solid red;
      }
    }
  }
}
.btn-wrap{
  padding: 5px;
  line-height: 1.8;
  button{
    margin: 3px;
  }
}
</style>
<script>
  const STATICKEYS = ['stroke', 'stroke-width', 'stroke-opacity', 'fill', 'fill-opacity']
  export default {
    name: 'EditPopup', 
    props: {
      position: {
        type: Array,
        default: () => { return [0, 0] }
      },
      offset: {
        type: Array,
        default: () => { return [0, 0] }
      },
      show: {
        type: Boolean,
        default: false
      },
      target: {
        type: Object,
        default: () => {
          return {
            geometry: null,
            properties: {}
          }
        }
      }
    },
    data() {
      return {
        editProp: Object.assign({}, this.target.properties),

        editKey: '',
        
        addItem: {
          key: '',
          value: ''
        },
        isAdd: false
      }
    },
    computed: {
       
    },
    watch: {
      target(val) {
        this.editProp = Object.assign({}, val.properties)
      },
      show(val) {
        if (val) {
          this.$refs.popup.show()
        } else {
          this.$refs.popup.hide()
        }
      }
    },
    methods: {
      setEdit(key) {
        if (STATICKEYS.find((item) => { return item === key })) return
        this.editKey = key
      },
      addItemBlur() {
        if (this.addItem.key && this.addItem.value) {
          this.editProp[this.addItem.key] = this.addItem.value
          this.addItem.key = ''
          this.addItem.value = ''
          this.isAdd = false
        }
      },
      addHandle() {
        this.isAdd = true 
      },
      saveHandle() {
        console.log('target', this.target)
        this.$emit('on-save', {
          id: this.target.id,
          geometry: this.target.geometry,
          properties: this.editProp
        })
        this.$refs.popup.hide()
      } 
       
    },
    created() {
    },
    mounted() {
      if (!this.show) {
        this.$refs.popup.hide()
      }
    },
    beforeDestroy() {
       
    }
  }
</script>
