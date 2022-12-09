<template>
    <div :style="{ width: '100%', height: '100%' }">
      <div>
        <a-divider orientation="left">Original DCMH Choice</a-divider>
        <a-row>
            <a-col :span="5">
                <a-checkbox-group v-model:value="dcmhcheck">
                <a-checkbox value="dcmh">dcmh</a-checkbox>
            </a-checkbox-group>
            </a-col>
        </a-row>
        <a-divider orientation="left">RoCMR Choice</a-divider>
        <a-radio-group
          v-model:value="rocmrchoice"
          name="radioGroup"
          style="width: 100%"
        >
          <a-row>
            <a-col :span="6">
                <a-radio value="rocmr_v">rocmr_v</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio value="rocmr_t">rocmr_t</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio value="rocmr_vt">rocmr_vt</a-radio> 
            </a-col>
          </a-row>
        </a-radio-group>
        <a-divider orientation="left">Choose Curve</a-divider>
        <a-radio-group
          v-model:value="distillationchoice"
          name="radioGroup"
          style="width: 100%"
        >
          <a-row>
            <a-col :span="6">
                <a-radio value="Distillation_v">distillation_v</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio value="Distillation_t">distillation_t</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio value="Distillation_vt">distillation_vt</a-radio> 
            </a-col>
            <a-col :span="5">
              <a-button
                type="primary"
                :loading="iconLoading"
                @click="enterIconLoading"
              >
                run
              </a-button>
            </a-col>
          </a-row>
        </a-radio-group>
      </div>
      <div>
        <a-divider orientation="left">Result</a-divider>
        <a-row :gutter="[0, 0]" justify='center' :style="{ width: '100%', height: '350px' }">
          <a-col :span="11">
            <EchartLine domID="it" :usrname="usrname" :options="itoption"></EchartLine>
          </a-col>
          <a-col :span="11">
            <EchartLine domID="ti" :usrname="usrname" :options="tioption"></EchartLine>
          </a-col>
      </a-row> 
        <a-row :gutter="[0, 0]" justify="center" :style="{ width: '100%', height: '350px' }"  >
          <a-col :span="11">
            <EchartLine domID="ii" :usrname="usrname" :options="iioption"></EchartLine>
          </a-col>
          <a-col :span="11">
            <EchartLine domID="tt" :usrname="usrname" :options="ttoption"></EchartLine>
          </a-col>
        </a-row>
      </div>
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  
  import { toRefs, defineComponent, reactive, ref, toRaw } from "vue";
  import EchartLine from "../../components/EchartLine.vue";
  import {postdata, postfine} from '../../utils/rocmr'
  import {SetOption, DefaultOption, tasks} from './fineOption'
  
  function updateoption(src, tar){
      src.title.text = tar.title.text
      src.series = tar.series
      src.legend.data = tar.legend.data 
  }
  
  export default defineComponent({
    components: {
      EchartLine,
    },
  
    setup() {
  
      const usrname = "shiro";
      const iconLoading = ref(false);
      const rocmrchoice = ref('rocmr_v')
      const distillationchoice = ref("Distillation_v")
      const dcmhcheck = ref(['dcmh'])
    //   var postmodels = ['dcmh']
      var options
  
      let itoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
      let tioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
      let iioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
      let ttoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
  
    function dopost(){
    postfine({
        thousand: 'false',
        methods: {
            'dcmh': dcmhcheck.value,
            'rocmr': [rocmrchoice.value],
            'distillation': [distillationchoice.value]
        }
      }).then(res => {

        //console.log(res)

        options = SetOption(res.data, 'dis')
        //console.log(options)
        updateoption(itoption, options['it'])
        updateoption(tioption, options['ti'])
        updateoption(iioption, options['ii'])
        updateoption(ttoption, options['tt'])
        // itoption.title.text = options['it'].title.text
        // itoption.series = options['it'].series
        // itoption.legend.data = options['it'].legend.data
        //console.log('check back ...')
        //console.log(toRaw(itoption))
      })
}
      //dopost()
  
      const enterIconLoading = () => {
        iconLoading.value = {
          delay: 100,
        };
        dopost()
        setTimeout(() => {
          iconLoading.value = false;
        }, 1000);
      };
      return {
        dcmhcheck,
        rocmrchoice,
        distillationchoice,
        iconLoading,
        enterIconLoading,
        usrname,
        itoption,
        tioption,
        iioption,
        ttoption
      };
    },
  });
  </script>
  