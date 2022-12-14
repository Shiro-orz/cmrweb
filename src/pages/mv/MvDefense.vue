<template>
    <div :style="{ width: '100%', height: '100%' }">
      <div>
        <a-divider orientation="left">Attack MVCNN</a-divider>
        <div id="attackEchart" :style="{width: '800px', height: '400px'}"></div>
        <a-divider orientation="left">Defense Method: MAAE Vs Adversarial Training</a-divider>
        <div id="defEchart" :style="{width: '800px', height: '400px'}"></div>
      </div>
     
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  
  import { toRefs, defineComponent, reactive, ref, toRaw, onMounted } from "vue";
  import * as echarts from 'echarts'

  export default defineComponent({
    components:{

    },

    setup() {
      
      const atOption = {
          title:{
            text: 'Acc of MVCNN',
            left:'center'
          },
          xAxis: {
          type: 'category',
          data: ['Benign', 'FGSM', 'BIM', 'MIM']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [0.944, 0.369, 0.37, 0.382],
            type: 'bar'
          }
        ]
      }

      const defOption = {
            title:{
                top: 0,
                text: 'Acc of Two Defense Methods',
                left:'center'
              },
            legend: {
              top: 30
            },
            tooltip: {},
            dataset: {
              source: [
                ['DefenseMethod', 'MAAE', 'AdvTraining'],
                ['FGSM', 0.891, 0.858],
                ['BIM', 0.895, 0.734],
                ['MIM', 0.885, 0.652],
              ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }]
          };

      onMounted(() => {
            var atChDom = document.getElementById('attackEchart')
            var atChart = echarts.init(atChDom)
            atOption && atChart.setOption(atOption)    
            var defChDom = document.getElementById('defEchart')
            var defChart = echarts.init(defChDom)
            defOption && defChart.setOption(defOption) 
            //     window.onresize = function () {
        //     myChart.resize()
        // }
        });

    },

   
  }) 
  </script>
  