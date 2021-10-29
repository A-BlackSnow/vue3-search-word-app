import type { App, Plugin } from 'vue';
import {
  Button,
  Icon,
  NavBar,
  Popup,
  PullRefresh,
  Search,
  Tabbar,
  TabbarItem,
  Lazyload,
  Image as VanImage,
  Form,
  Field,
  Dialog,
  Popover,
  Empty,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
} from 'vant';

const components: Plugin[] = [
  Button,
  Tabbar,
  TabbarItem,
  NavBar,
  Icon,
  Popup,
  Search,
  PullRefresh,
  Lazyload,
  VanImage,
  Form,
  Field,
  Dialog,
  Popover,
  Empty,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
];

export const registerComponent = (app: App): App => {
  components.forEach((component) => app.use(component));
  return app;
};

export const setRem = (app: App): App => {
  const rootElement = document.documentElement;
  const setRootFontSize = () => {
    // 设置根字体大小
    rootElement.style.fontSize = `${rootElement.clientWidth / 10}px`;

    // 设置像素比
    rootElement.dataset.dpr = `${window.devicePixelRatio}`;
  };

  setRootFontSize();
  window.addEventListener('resize', setRootFontSize);

  return app;
};
