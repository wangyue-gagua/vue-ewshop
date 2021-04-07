import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Image as VanImage,
  Tag,
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Badge,
  Tab,
  Tabs,
  Sidebar,
  SidebarItem,
  Collapse,
  CollapseItem,
  Card,
  Form,
  Field,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Icon,
  Popup,
  Grid,
  GridItem,
} from "vant";

createApp(App)
  .use(VanImage)
  .use(Tag)
  .use(Button)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Badge)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Field)
  .use(Card)
  .use(Form)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(Icon)
  .use(Popup)
  .use(Grid)
  .use(GridItem)
  .use(store)
  .use(router)
  .mount("#app");
