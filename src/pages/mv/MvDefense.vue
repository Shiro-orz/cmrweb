<template>
    <div :style="{ width: '100%', height: '100%' }">
      <div>
        <a-divider orientation="left">Attack MVCNN</a-divider>
        <a-row>
          <div :style="{width: '10%'}"></div>
        <div id="attackEchart" :style="{width: '800px', height: '400px'}"></div>
        </a-row>
        <a-divider orientation="left">Defense Method: MAAE Vs Adversarial Training</a-divider>
        <a-row>
        <div :style="{width: '5%'}"></div>
        <div>Choose adversarial data for MAAE or Adversarial Training:</div>
        </a-row>
        <a-radio-group
          v-model:value="advtype"
          name="radioGroup"
          style="width: 100%"
        >
          <a-row>
            <a-col :span="5">
                <a-radio value="FGSM">FGSM</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio value="BIM">BIM</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio value="MIM">MIM</a-radio> 
            </a-col>
          </a-row>
        </a-radio-group>
        <a-row>
          <div :style="{width: '10%'}"></div>
        <div id="defEchart" :style="{width: '800px', height: '400px'}"></div>
        </a-row>
        <a-row>
        <div :style="{width: '5%'}"></div>
        <div>FR score:  </div> 
        <div :style="{width: '5%'}"></div>
        <!-- <div>
          <div>use FGSM samples</div>
          <div>MAAE:  0.053/0.051/0.055</div>
          <div>AdvTrain:  0.001/0.101/0.101</div>
          <div>Dis:  0.525/0.526/0.430</div>
        </div>
        <div :style="{width: '5%'}"></div>
        <div>
          <div>use BIM samples</div>
          <div>MAAE:  0.048/0.049/0.049</div>
          <div>AdvTrain:  0.115/0.016/0.115</div>
          <div>Dis:  0.525/0.526/0.430</div>
        </div>
        <div :style="{width: '5%'}"></div>
        <div>
          <div>use MIM samples</div>
          <div>MAAE:  0.06/0.06/0.059</div>
          <div>AdvTrain:  0.121/0.111/0.01</div>
          <div>Dis:  0.525/0.526/0.430</div>
        </div> -->
        <div>
          <div>use FGSM samples</div>
          <div>MAAE:  0.053/0.051/0.055</div>
          <div>AdvTrain:  0.059/0.06/0.045</div>
          <div>Dis:  0.525/0.526/0.430</div>
        </div>
        <div :style="{width: '5%'}"></div>
        <div>
          <div>use BIM samples</div>
          <div>MAAE:  0.048/0.049/0.049</div>
          <div>AdvTrain:  0.06/0.058/0.061</div>
          <div>Dis:  0.525/0.526/0.430</div>
        </div>
        <div :style="{width: '5%'}"></div>
        <div>
          <div>use MIM samples</div>
          <div>MAAE:  0.06/0.06/0.059</div>
          <div>AdvTrain:  0.067/0.067/0.089</div>
          <div>Dis:  0.525/0.526/0.430</div>
        </div>

        </a-row>
      </div>
     
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  
  import { watch, toRefs, defineComponent, reactive, ref, toRaw, onMounted } from "vue";
  import * as echarts from 'echarts'

  export default defineComponent({
    components:{

    },

    setup() {
      var advtype = ref('FGSM')

      const MAAEdatas = {
        'FGSM': [0.891, 0.893, 0.889],
        'BIM': [0.896, 0.895, 0.895],
        'MIM': [0.884, 0.884, 0.885]
      }

      const DISdatas = {
        'FGSM': 0.419,
        'BIM': 0.418,
        'MIM': 0.430
      }

      // const ATdatas = {
      //   'FGSM': [0.943, 0.843, 0.843],
      //   'BIM': [0.829, 0.928, 0.829],
      //   'MIM': [0.823, 0.833, 0.934]
      // }

      const ATdatas = {
        'FGSM': [0.885, 0.884, 0.899],
        'BIM': [0.884, 0.886, 0.883],
        'MIM': [0.878, 0.877, 0.855]
      }

      const base = 0.944
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
            type: 'bar',
            itemStyle:{
              normal:{
                label:{
                  show: true,
                  position: 'top'
                }
              }
            }
          }
        ]
      }

      var defOption = reactive({
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
                ['DefenseMethod', 'MAAE', 'AdvTraining', 'Distillation'],
                ['FGSM', MAAEdatas[advtype.value][0], ATdatas[advtype.value][0], DISdatas['FGSM']],
                ['BIM', MAAEdatas[advtype.value][1], ATdatas[advtype.value][1], DISdatas['BIM']],
                ['MIM', MAAEdatas[advtype.value][2], ATdatas[advtype.value][2], DISdatas['MIM']],
              ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }, {type: 'bar'}]
          });
      var maaefgsm = reactive((base - MAAEdatas[advtype.value][0]).toFixed(4)) 

      onMounted(() => {
            var atChDom = document.getElementById('attackEchart')
            var atChart = echarts.init(atChDom)
            atOption && atChart.setOption(atOption)    
            var defChDom = document.getElementById('defEchart')
            var defChart = echarts.init(defChDom)
            defChart.clear()
            defOption && defChart.setOption(defOption)             
            //     window.onresize = function () {
        //     myChart.resize()
        // }
        });

        watch(
            advtype,
            () => {
                var chartDom = document.getElementById('defEchart')
                //const chartDom = ref("myEcharts")
                var defChart = echarts.init(chartDom)// console.log('watch ...')
                defChart.clear()
                defOption.dataset.source[1][2] = ATdatas[advtype.value][0]
                defOption.dataset.source[2][2] = ATdatas[advtype.value][1]
                defOption.dataset.source[3][2] = ATdatas[advtype.value][2]
                defOption.dataset.source[1][1] = MAAEdatas[advtype.value][0]
                defOption.dataset.source[2][1] = MAAEdatas[advtype.value][1]
                defOption.dataset.source[3][1] = MAAEdatas[advtype.value][2]

                if (defChart) {
                    defChart.setOption(defOption)
                }
            },
            {deep: true}
        )
      
      return {
        advtype,
      }

    },

   
  }) 
  </script>
  