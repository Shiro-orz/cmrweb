<template>
    <div :id="domID" ref="myEcharts" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
/* eslint-disable */
import { watch, object, defineComponent, onUnmounted, onMounted, defineProps, ref, toRefs, reactive, toRaw } from 'vue';
import * as echarts from 'echarts'
import { string } from '_vue-types@3.0.2@vue-types';
//import { object } from '_vue-types@3.0.2@vue-types';

var myChart
export default defineComponent({
  //name: "echartsBox",
   props : {
    usrname: String,
    options: Object,
    domID: String
   },
    // props : {
    //     // options:{
    //     //     type: object,
    //     //     //default: ref(),
    //     //     required: true
    //     //     }
    //     },
    setup(props) {
        var op = toRefs(props)
        var domID = op.domID.value
        var option = op.options
        onMounted(() => {
            var chartDom = document.getElementById(domID)
            //const chartDom = ref("myEcharts")
            myChart = echarts.init(chartDom)
            myChart.setOption(option.value)
        //     window.onresize = function () {
        //     myChart.resize()
        // }
        });

        // onUnmounted(() => {
        // myChart.dispose;
        // }); 
	
    // 基础配置一下Echarts
    // function initChart() {
    //   // 把配置和数据放这里
    //   myChart.setOption(options1)
    //   window.onresize = function () {
    //     myChart.resize()
    //   }
    // }
        watch(
            props,
            () => {
                console.log('watch ...')
                console.log(toRaw(props.options))
                if (myChart) {
                    console.log('渲染')
                    myChart.setOption(props.options)
                }
            },
            {deep: true}
        )
    // watch(option,(newOptions)=>{
    //     myChart.setOption(newOptions)
    // },
    // {deep:true}
    // )
        return { domID };
  }
});
</script>
  
