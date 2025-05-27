import { createRouter, createWebHistory } from 'vue-router'
import Revenue from '../views/Revenue.vue'
import Inventory from '../views/Inventory.vue'
import AddProduct from '../views/AddProduct.vue'

const routes = [
  { path: '/', redirect: '/revenue' },
  { path: '/revenue', component: Revenue },
  { path: '/inventory', component: Inventory },
  { path: '/add-product', component: AddProduct },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
