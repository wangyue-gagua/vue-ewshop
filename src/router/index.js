import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import { Notify } from "vant";

const Category = () => import("../views/category/Category.vue");
const Detail = () => import("../views/detail/Detail.vue");
const Home = () => import("../views/home/Home.vue");
const Profile = () => import("../views/profile/Profile.vue");
const ShopCart = () => import("../views/shopcart/ShopCart.vue");
const Register = () => import("../views/profile/Register.vue");
const Login = () => import("../views/profile/Login.vue");
const AddressList = () => import("../views/profile/Address/AddressList.vue");
const AddressEdit = () => import("../views/profile/Address/AddressEdit.vue");
const CreateOrder = () => import("../views/order/CreateOrder.vue");
const OrderDetail = () => import("../views/order/OrderDetail.vue");
const Order = () => import("../views/order/Order.vue");
const routes = [
  {
    path: "/",
    name: "DefaultHome",
    component: Home,
    meta: {
      title: "guagua-book",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "guagua-book",
    },
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta: {
      title: "guagua-book category",
    },
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta: {
      title: "guagua-book detail",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "guagua-book user",
      isAuthRequired: true,
    },
  },
  {
    path: "/shopcart",
    name: "ShopCart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ShopCart,
    meta: {
      title: "guagua-book shopcart",
      isAuthRequired: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "guagua-book register",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "guagua-book Login",
    },
  },
  {
    path: "/address-list",
    name: "AddressList",
    component: AddressList,
    meta: {
      title: "guagua-book Address",
      isAuthRequired: true,
    },
  },
  {
    path: "/address-edit",
    name: "AddressEdit",
    component: AddressEdit,
    meta: {
      title: "guagua-book AddressEdit",
      isAuthRequired: true,
    },
  },
  {
    path: "/createOrder",
    name: "CreateOrder",
    component: CreateOrder,
    meta: {
      title: "guagua-book CreateOrder",
      isAuthRequired: true,
    },
  },
  {
    path: "/orderDetail",
    name: "OrderDetail",
    component: OrderDetail,
    meta: {
      title: "guagua-book OrderDetail",
      isAuthRequired: true,
    },
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: {
      title: "guagua-book Order",
      isAuthRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // if not authentication for login
  if (to.meta.isAuthRequired && store.state.user.isLoggedIn === false) {
    Notify("请先登录");
    return next("/login");
  } else {
    next();
  }

  document.title = to.meta.title;
});

export default router;
