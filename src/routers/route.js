import {createRouter, createWebHashHistory} from 'vue-router'
import VsDcmh from '../pages/rocmr/VsDcmh.vue'
import VsFine from '../pages/rocmr/VsFine.vue'
import VsDis from '../pages/rocmr/VsDis.vue'
import MvVisual from '../pages/mv/MvVisual.vue'
import MvDefense from '../pages/mv/MvDefense.vue'

const routes = [
    { path: '/vsdcmh', component: VsDcmh},
    { path: '/vsfine', component: VsFine},
    { path: '/vsdis', component: VsDis},
    { path: '/mvVisual', component:MvVisual},
    { path: '/mvDefense', component:MvDefense}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
