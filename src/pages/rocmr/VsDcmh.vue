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
            <a-radio value="1">PR</a-radio>
          </a-col>
          <a-col :span="5">
            <a-radio value="2">Precision1000</a-radio>
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
      <a-row :gutter="[0, 0]" :style="{ width: '100%', height: '300px' }">
      <EchartLine domID="jjj1" :usrname="usrname" :options="resoption"></EchartLine>
        </a-row> 
      <a-row :gutter="[0, 0]" justify="center" :style="{ width: '100%', height: '350px' }"  >
        <a-col :span="11">
          <EchartLine domID="jjj2" :usrname="usrname" :options="itoption"></EchartLine>
        </a-col>
        <a-col :span="11">
          <EchartLine domID="jjj3" :usrname="usrname" :options="resoption"></EchartLine>
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
import {SetOption, DefaultOption} from './config'


const resoption = ref({
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

export default defineComponent({
  components: {
    EchartLine,
  },

  setup() {

    const usrname = "shiro";
    const iconLoading = ref(false);
    const models = ref(['dcmh']);
    const curve = ref("1")
    let itoption = reactive({})
    const enterIconLoading = () => {
      iconLoading.value = {
        delay: 100,
      };

      postdata({
        A: 'test for api'
      }).then(res => {

        var postmodels = []
        for (var key in models.value) {
            postmodels.push(models.value[key]);
        } 

        let options = SetOption(postmodels, res.data)

        itoption = options['it']
        console.log(options['it'])
        // itoption.legend = options['it'].legend
        // itoption.series = options['it'].series
        // itoption.title = options['it'].title
        console.log(resoption)
        console.log(toRaw(itoption))
      })
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
      itoption
    };
  },
});
</script>
