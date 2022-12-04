<template>
    <div :id="domID" ref="myEcharts" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
/* eslint-disable */
import { object, defineComponent, onUnmounted, onMounted, defineProps, ref, toRefs, reactive } from 'vue';
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
        console.log(props)
        var op = toRefs(props)
        var domID = op.domID.value
    
        onMounted(() => {
            console.log("111111")
            console.log(props)
            console.log(op.options)
            /// 声明定义一下echart
            // if (myChart != null && myChart != "" && myChart != undefined) {
            //     myChart.dispose();
            // }
            var chartDom = document.getElementById(domID)
            //const chartDom = ref("myEcharts")
            myChart = echarts.init(chartDom)

            myChart.setOption(op.options.value)
        //     window.onresize = function () {
        //     myChart.resize()
        // }
        });

        onUnmounted(() => {
        myChart.dispose;
        }); 
	
    // 基础配置一下Echarts
    // function initChart() {
    //   // 把配置和数据放这里
    //   myChart.setOption(options1)
    //   window.onresize = function () {
    //     myChart.resize()
    //   }
    // }

    // watch(options,(newOptions)=>{
    //     myChart.setOption(newOptions)
    // },
    // {deep:true}
    // )
        return { domID };
  }
});
</script>
  
