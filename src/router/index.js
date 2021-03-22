import { createRouter, createWebHistory } from 'vue-router'

const Category = () => import('../views/category/Category.vue')
const Detail = () => import('../views/detail/Detail.vue')
const Home = () => import('../views/home/Home.vue')
const Profile = () => import('../views/profile/Profile.vue')
const ShopCart = () => import('../views/shopcart/ShopCart.vue')
const routes = [
  {
    path: '/',
    name: 'DefaultHome',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ShopCart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
