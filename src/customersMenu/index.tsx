import { Boot } from "@wangeditor/editor";
import ProductMenu from "./ProductParams";
import { genConfig } from "./config";

// 定义菜单配置
export const menuConf = {
  key: "product-param", // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new ProductMenu();
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: {
    productParams: genConfig()
  }
};

// 注册到 wangEditor
//Boot.registerMenu(menuConf);
