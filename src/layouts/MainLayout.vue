<template>
<a-layout
:style="{ background: '#fff', minHeight: '580px', height:'100%'}"
>
  <HeadLayout/>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff"> 
      <SiderLayout/>
    </a-layout-sider>
    <a-layout style="padding: 1 24px 24px">
      <ConLayout/>
    </a-layout>
  </a-layout>
</a-layout>
</template>
<script>
import HeadLayout from './components/HeadLayout.vue';
import SiderLayout from './components/SiderLayout.vue';
import ConLayout from './components/ConLayout.vue';

import { defineComponent, ref } from 'vue';
export default defineComponent({
  components:{
    HeadLayout,
    SiderLayout,
    ConLayout
  },
  setup(){
    return{
      collpased: ref(true),
    };
  }
})
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>