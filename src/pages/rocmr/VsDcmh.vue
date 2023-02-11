<template>
  <div :style="{ width: '100%', height: '100%' }">
    <div>
      <a-divider orientation="left">Choose Model</a-divider>
        <a-row>
          <a-col :span="6">
            <a-checkbox-group v-model:value="dcmhcheck">
            <a-checkbox value="dcmh">dcmh</a-checkbox>
            </a-checkbox-group>
          </a-col>
        <a-col :span="6">
          <a-checkbox-group v-model:value="rocmrcheck">
            <a-row>
          <a-col :span="10">
            <a-checkbox value="rocmr_v">rocmr_v</a-checkbox>
          </a-col>
          <a-col :span="10">
            <a-checkbox value="rocmr_t">rocmr_t</a-checkbox>
          </a-col>
          <a-col :span="4">
            <a-checkbox value="rocmr_vt">rocmr_vt</a-checkbox>
          </a-col>
        </a-row>
        </a-checkbox-group>
        </a-col>
        
        </a-row>
      
      <a-divider orientation="left">Choose Attack Method</a-divider>
      <a-radio-group
        v-model:value="atmethod"
        name="radioGroup"
        style="width: 100%"
      >
        <a-row>
          <a-col :span="6">
            <a-radio value="pgd">PGD</a-radio>
          </a-col>          
        </a-row>
      </a-radio-group> 


      <a-divider orientation="left">Choose Curve</a-divider>
      <a-radio-group
        v-model:value="curve"
        name="radioGroup"
        style="width: 100%"
      >
        <a-row>
          <a-col :span="6">
            <a-radio value="false">PR</a-radio>
          </a-col>
          <a-col :span="5">
            <a-radio value="true">Precision1000</a-radio>
          </a-col>
          <a-col :span="8">
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
    const curve = ref("false")
    const atmethod = ref("pgd")
    const dcmhcheck = ref(['dcmh'])
    const rocmrcheck = ref([])
    var postmodels = ['dcmh']
    var options

    let itoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
    let tioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
    let iioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
    let ttoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))

function dopost(){
    postfine({
        thousand: curve.value,
        methods: {
            'dcmh': dcmhcheck.value,
            'rocmr': rocmrcheck.value
        }
      }).then(res => {

        //console.log(res)

        options = SetOption(res.data, 'dcmh')
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
    dopost()

    const enterIconLoading = () => {
      iconLoading.value = {
        delay: 100,
      };
      dopost()
    //   postdata({
    //     A: 'test for api'
    //   }).then(res => {

    //     postmodels = []
    //     for (var key in models.value) {
    //         postmodels.push(models.value[key]);
    //     } 

    //     options = SetOption(postmodels, res.data)
    //     updateoption(itoption, options['it'])
    //     updateoption(tioption, options['ti'])
    //     updateoption(iioption, options['ii'])
    //     updateoption(ttoption, options['tt'])
    //     // itoption.title.text = options['it'].title.text
    //     // itoption.series = options['it'].series
    //     // itoption.legend.data = options['it'].legend.data
    //     console.log('check back ...')
    //     console.log(toRaw(itoption))
    //     console.log(toRaw(resoption))
    //   })
      setTimeout(() => {
        iconLoading.value = false;
      }, 1000);
    };
    return {
      curve,
      atmethod,
      dcmhcheck,
      rocmrcheck,
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
