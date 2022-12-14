<template>
    <a-menu
      v-model:selectedKeys="selectedKeys2"
      v-model:openKeys="openKeys"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            RoCMR
          </span>
        </template>
        <a-menu-item key="1"><router-link to="/vsdcmh">Vs DCMH</router-link></a-menu-item>
        <a-menu-item key="2"><router-link to="/vsfine">Vs Finetune</router-link></a-menu-item>
        <a-menu-item key="3"><router-link to="/vsdis">Vs Distillation</router-link></a-menu-item>
        
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            MultiView
          </span>
        </template>
        <!-- <a-menu-item key="5">Attack</a-menu-item> -->
        <a-menu-item key="6"><router-link to="/mvDefense">Defense</router-link></a-menu-item>
        <a-menu-item key="7"><router-link to="/mvVisual">Visualize</router-link></a-menu-item>
      </a-sub-menu>
    </a-menu>
</template>

<script>
//import { LaptopOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    //LaptopOutlined,
  },
  setup() {
    return {
      selectedKeys1: ref(['2']),
      selectedKeys2: ref(['1']),
      //collapsed: ref(false),
      openKeys: ref(['sub1']),
    };
  },
});
</script>