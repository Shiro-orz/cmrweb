<template>
    <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: '12px', minHeight: '280px' }"
        >
    <router-view></router-view>
    </a-layout-content>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    components:{

    },
    setup() {

    }
})
</script>