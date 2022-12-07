<template>
  <div :style="{ width: '100%', height: '100%' }">
    <div>
      <a-divider orientation="left">Choose Model</a-divider>
      <a-checkbox-group v-model:value="models" style="width: 100%">
        <a-row>
          <a-col :span="5">
            <a-checkbox value="dcmh">DCMH</a-checkbox>
          </a-col>
          <a-col :span="4">
            <a-checkbox value="dcmh_v">DCMH+V</a-checkbox>
          </a-col>
          <a-col :span="4">
            <a-checkbox value="dcmh_t">DCMH+T</a-checkbox>
          </a-col>
          <a-col :span="4">
            <a-checkbox value="dcmh_vt">DCMH+VT</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
      <a-divider orientation="left">Choose Curve</a-divider>
      <a-radio-group
        v-model:value="curve"
        name="radioGroup"
        style="width: 100%"
      >
        <a-row>
          <a-col :span="5">
            <a-radio value="pr">PR</a-radio>
          </a-col>
          <a-col :span="5">
            <a-radio value="pr1000">Precision1000</a-radio>
          </a-col>
          <a-col :span="10">
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
import {postdata} from '../../utils/rocmr'
import {SetOption, DefaultOption, tasks} from './config'


const resoption = reactive({
  xAxis: {
    type: "category",
    data: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
  },
  tooltip: {
    trigger: "axis",
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129],
      type: "line",
      smooth: true,
    },
  ],
});

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
    const models = ref(['dcmh']);
    const curve = ref("pr")
    var postmodels = ['dcmh']
    var options

    let itoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
    let tioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
    let iioption = reactive(JSON.parse(JSON.stringify(DefaultOption)))
    let ttoption = reactive(JSON.parse(JSON.stringify(DefaultOption)))

function dopost(){
    postdata({
        type: curve.value
      }).then(res => {

        postmodels = []
        for (var key in models.value) {
            postmodels.push(models.value[key]);
        } 

        options = SetOption(postmodels, res.data)
        updateoption(itoption, options['it'])
        updateoption(tioption, options['ti'])
        updateoption(iioption, options['ii'])
        updateoption(ttoption, options['tt'])
        // itoption.title.text = options['it'].title.text
        // itoption.series = options['it'].series
        // itoption.legend.data = options['it'].legend.data
        console.log('check back ...')
        console.log(toRaw(itoption))
        console.log(toRaw(resoption))
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
      models,
      curve,
      iconLoading,
      enterIconLoading,
      usrname,
      resoption,
      itoption,
      tioption,
      iioption,
      ttoption
    };
  },
});
</script>
