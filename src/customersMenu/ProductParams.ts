import { Editor } from "slate";
import { IDropPanelMenu, IDomEditor, DomEditor, t } from "@wangeditor/core";
import $, { Dom7Array } from "./dom";

class ProductMenu implements IDropPanelMenu {
  readonly title = "自定义列表";
  readonly tag = "button";
  readonly showDropPanel = true; // 点击 button 时显示 dropPanel
  private $content: Dom7Array | null = null;

  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 droPanel 之前，不需要执行其他代码
    // 此处空着即可
    //editor.focus();
  }

  getValue(editor: IDomEditor): string | boolean {
    // 不需要 getValue
    return "";
  }

  isActive(editor: IDomEditor): boolean {
    // 不需要 active
    return false;
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) return true;

    const [match] = Editor.nodes(editor, {
      match: (n) => {
        const type = DomEditor.getNodeType(n);

        if (type === "pre") return true; // 代码块
        if (Editor.isVoid(editor, n)) return true; // void node

        return false;
      },
      universal: true
    });

    if (match) return true;
    return false;
  }

  getPanelContentElem(editor: IDomEditor): Dom7Array {
    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<ul class="w-e-panel-content-product-params"></ul>');

      // 绑定事件（仅第一次绑定，不可重复绑定）
      $content.on("mousedown", "li", (e: Event) => {
        const { target } = e;
        console.log("mousedown:", target);
        if (target == null) return;
        e.preventDefault();

        const $li = $(target);
        const productParamStr = $li.attr("data-value");
        alert(productParamStr);
        const $insertNode = $('<li style="color: blue;"></li>');
        $insertNode.text(productParamStr);
        alert($insertNode.html());

        //editor.insertBreak();

        //editor.dangerouslyInsertHtml($insertNode.html());
        editor.insertText(productParamStr);
        //editor.insertNode(
        //  $(`<li style="color: blue;">${productParamStr}</li>`)
        //);
      });

      this.$content = $content;
    }

    const $content = this.$content;
    if ($content == null) return $();
    $content.html(""); // 清空之后再重置内容

    // 获取菜单配置
    const colorConf = editor.getMenuConfig("product-param");
    const productParams = colorConf["productParams"];
    // 根据菜单配置生成 panel content
    productParams?.forEach((productParam: { value: any; text: any }) => {
      const $li = $(
        `<li data-value="${productParam.value}">${productParam.text}</li>`
      );
      $content.append($li);
    });

    // console.log('nodeType:', $content.nodeType);
    return $content?.[0];
  }
}

export default ProductMenu;
