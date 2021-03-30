import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Image as VanImage, Tag, Button, Swipe, SwipeItem, Lazyload, Badge, Tab, Tabs, Sidebar, SidebarItem, Collapse, CollapseItem, Card } from "vant";

createApp(App)
  .use(VanImage).use(Tag).use(Button)
  .use(Tab).use(Tabs)
  .use(Swipe).use(SwipeItem)
  .use(Lazyload).use(Badge)
  .use(Sidebar).use(SidebarItem)
  .use(Collapse).use(CollapseItem)
  .use(Card)
  .use(store)
  .use(router)
  .mount("#app");
