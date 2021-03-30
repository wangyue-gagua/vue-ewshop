import { createRouter, createWebHistory } from 'vue-router'

const Category = () => import('../views/category/Category.vue')
const Detail = () => import('../views/detail/Detail.vue')
const Home = () => import('../views/home/Home.vue')
const Profile = () => import('../views/profile/Profile.vue')
const ShopCart = () => import('../views/shopcart/ShopCart.vue')
const Register = () => import('../views/profile/Register.vue')
const Login = () => import('../views/profile/Login.vue')
const routes = [
  {
    path: '/',
    name: 'DefaultHome',
    component: Home,
    meta: {
      title: 'guagua-book',
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'guagua-book',
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: 'guagua-book category',
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: 'guagua-book detail',
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'guagua-book user',
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ShopCart,
    meta: {
      title: 'guagua-book shopcart',
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'guagua-book register',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'guagua-book Login',
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  // if not authentication for login
  next();
  document.title = to.meta.title
})

export default router
