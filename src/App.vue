<template>
  <MainLayout/>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue'
import * as echarts from "echarts";
import { provide } from 'vue';

export default {
  name: 'App',
  components: {
    MainLayout
  },
  setup(){
    provide('echarts', echarts)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
