<template>
    <div :style="{ width: '100%', height: '100%' }">
      <div>
        <a-divider orientation="left">Choose Class</a-divider>
        <a-row>
          <div :style="{width: '10%'}"></div>
        <a-radio-group v-model:value="picclass" button-style="solid">
          <a-radio-button value="airplane">Airplane</a-radio-button>
          <a-radio-button value="car">Car</a-radio-button>
          <a-radio-button value="guitar">Guitar</a-radio-button>
        </a-radio-group>
        </a-row>
        <a-divider orientation="left">Choose attack method</a-divider>
         <a-row>
          <div :style="{width: '10%'}"></div>
        <a-radio-group v-model:value="advmethod" button-style="solid">
          <a-radio-button value="FGSM">FGSM</a-radio-button>
          <a-radio-button value="BIM">BIM</a-radio-button>
          <a-radio-button value="MIM">MIM</a-radio-button>
        </a-radio-group>
        <div :style="{width: '10%'}"></div>
        <!-- <a-button
                type="primary"
                :loading="iconLoading"
                @click="enterIconLoading"
              >
                show
              </a-button> -->
        </a-row>
      </div>
      <div>
        <a-divider orientation="left">Result</a-divider>
        <a-image
          :width="900"
          :height="900"
          :src="dicts[picclass][advmethod]"
          fallback="data:image/png;base64,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"
        />
      </div>
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  
  import { toRefs, defineComponent, reactive, ref, toRaw } from "vue";
  import airplanefgsm from "../../assets/pics/airplane/FGSM.jpg"
  import airplanebim from "../../assets/pics/airplane/BIM.jpg"
  import airplanemim from "../../assets/pics/airplane/MIM.jpg"
  import carfgsm from "../../assets/pics/car/FGSM.jpg"
  import carbim from "../../assets/pics/car/BIM.jpg"
  import carmim from "../../assets/pics/car/MIM.jpg"
  import guitarfgsm from "../../assets/pics/guitar/FGSM.jpg"
  import guitarbim from "../../assets/pics/guitar/BIM.jpg"
  import guitarmim from "../../assets/pics/guitar/MIM.jpg"
//   import EchartLine from "../../components/EchartLine.vue";
//   import {postdata, postfine} from '../../utils/rocmr'
//   import {SetOption, DefaultOption, tasks} from './fineOption'
  
//   function updateoption(src, tar){
//       src.title.text = tar.title.text
//       src.series = tar.series
//       src.legend.data = tar.legend.data 
//   }
  export default defineComponent({
    components:{

    },

    setup() {
      const iconLoading = ref(false);
      const picclass = ref('airplane')
      const advmethod = ref('FGSM') 
      // var path = reactive('../../assets/pics/' + picclass.value + '/' + advmethod.value)
      var path = '../../assets/pics/' + 'airplane'+ '/' + 'FGSM.jpg'
      console.log(path)
      const dicts = {
        'airplane':{
          'FGSM':airplanefgsm,
          'BIM':airplanebim,
          'MIM':airplanemim
        },
        'car':{
          'FGSM':carfgsm,
          'BIM':carbim,
          'MIM':carmim
        },
        'guitar':{
          'FGSM':guitarfgsm,
          'BIM':guitarbim,
          'MIM':guitarmim
        },
      }
      // var picpath = require('../../assets/pics/airplane/FGSM.jpg')
      let picpath = reactive(dicts[picclass.value][advmethod.value])
      const enterIconLoading = () => {
        iconLoading.value = {
          delay: 100,
        };
        console.log(picclass.value)
        picpath = dicts[picclass.value][advmethod.value]
        setTimeout(() => {
          iconLoading.value = false;
        }, 1000);
      };

      return {
      picclass,
      advmethod,
      path,
      dicts,
      picpath,
      iconLoading,
      enterIconLoading
    }

    },

   
  }) 
//   export default defineComponent({
//     components: {
//       EchartLine,
//     },
  
//     setup() {
  
//       const usrname = "shiro";
//       const iconLoading = ref(false);
//       const rocmrchoice = ref('rocmr_v')
//       const distillationchoice = ref("Distillation_v")
//       const dcmhcheck = ref(['dcmh'])
//     //   var postmodels = ['dcmh']
//       var options
  
//       let itoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
//       let tioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
//       let iioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
//       let ttoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
  
//     function dopost(){
//     postfine({
//         thousand: 'false',
//         methods: {
//             'dcmh': dcmhcheck.value,
//             'rocmr': [rocmrchoice.value],
//             'distillation': [distillationchoice.value]
//         }
//       }).then(res => {

//         //console.log(res)

//         options = SetOption(res.data, 'dis')
//         //console.log(options)
//         updateoption(itoption, options['it'])
//         updateoption(tioption, options['ti'])
//         updateoption(iioption, options['ii'])
//         updateoption(ttoption, options['tt'])
//         // itoption.title.text = options['it'].title.text
//         // itoption.series = options['it'].series
//         // itoption.legend.data = options['it'].legend.data
//         //console.log('check back ...')
//         //console.log(toRaw(itoption))
//       })
// }
//       dopost()
  
//       const enterIconLoading = () => {
//         iconLoading.value = {
//           delay: 100,
//         };
//         dopost()
//         setTimeout(() => {
//           iconLoading.value = false;
//         }, 1000);
//       };
//       return {
//         dcmhcheck,
//         rocmrchoice,
//         distillationchoice,
//         iconLoading,
//         enterIconLoading,
//         usrname,
//         itoption,
//         tioption,
//         iioption,
//         ttoption
//       };
//     },
//   });
  </script>
  