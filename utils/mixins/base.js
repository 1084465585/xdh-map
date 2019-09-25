/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-02 20:57:42
 * @LastEditTime: 2019-06-02 20:57:42
 * @LastEditors: your name
 */
import { convertToWgs84 } from '../convert';
/**
 *  Vue组件公共参数
 */
export default {
  /**
   * @property {number[]} position 经纬度位置
   * @property {number} [zIndex] 渲染层级
   * @property {string} [fill] 填充颜色
   * @property {string} [cursor] 鼠标经过时形状
   * @property {object} [props] 绑定到feature上的自定义属性
   */
  props: {
    // 经纬度坐标
    position: Array,
    // 层级
    zIndex: Number,
    // 填充颜色
    fill: String,

    // 鼠标经过形状
    cursor: String,

    // 绑定到 ol Feature 对象的 自定义属性
    props: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  inject: ['coordType'],
  watch: {
    position: {
      deep: true,
      handler() {
        // 方法在 utils/feature.js 中定义
        this.update();
      }
    }
  },
  computed: {
    coordinate() {
      // 转换坐标的数组类型
      return convertToWgs84(
        this.coordType,
        this.position.map(n => Number.parseFloat(n))
      );
    }
  },
  methods: {
    baseStyleRender() {
      return {
        className: 'Style',
        zIndex: this.zIndex,
        fill: this.fill
      };
    }
  }
};
