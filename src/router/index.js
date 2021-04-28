import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue')
  },
  {
    path:'/view/:slug',
    name: 'ViewProduct',
    props:true,
    component: ()=> import(/* webpackChunkName: "view" */ '../views/ViewProduct.vue'),
  },
  {
    path:'/add',
    name: 'AddProduct',
    component: ()=> import(/* webpackChunkName: "AddProduct" */ '../views/AddProduct.vue'),
  },
  {
    path: "/index.html",
    redirect: "/" 
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
