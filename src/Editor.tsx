import React, { useState, useEffect, FC } from "react";
import "@wangeditor/editor/dist/css/style.css";
import "./customersMenu/index.less";
import { IDomEditor } from "@wangeditor/core";
import {
  IEditorConfig,
  IToolbarConfig,
  SlateDescendant,
  Boot
} from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { menuConf } from "./customersMenu";

// 注册到 wangEditor,注意不要重复注册
Boot.registerMenu(menuConf);

const ReactEditor: FC = () => {
  // 存储 editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 存储 editor 的最新内容（json 格式）
  const [curContent, setCurContent] = useState<SlateDescendant[]>([]);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    /* 工具栏配置 */
    insertKeys: {
      index: 35, // 插入的位置，基于当前的 toolbarKeys
      keys: ["product-param"]
    }
  };

  // console.log(editor?.getAllMenuKeys());

  // editor 配置
  const editorConfig: Partial<IEditorConfig> = {
    //MENU_CONF: {
    //  "product-param": {}
    //}
  };
  editorConfig.placeholder = "请输入内容...";
  editorConfig.onCreated = (editor: IDomEditor) => {
    // 记录 editor 实例，重要 ！
    // 有了 editor 实例，就可以执行 editor API
    setEditor(editor);
  };
  editorConfig.onChange = (editor: IDomEditor) => {
    // editor 选区或者内容变化时，获取当前最新的的 content
    setCurContent(editor.children);
    console.log(editor.getHtml());
  };

  // 及时销毁 editor ，重要！！！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  console.log("curContent:", curContent);
  return (
    <React.Fragment>
      <div style={{ border: "1px solid #ccc" }}>
        {/* 渲染 toolbar */}
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />

        {/* 渲染 editor */}
        <Editor
          defaultConfig={editorConfig}
          defaultContent={[]}
          mode="default"
          style={{ height: "500px" }}
        />
      </div>
    </React.Fragment>
  );
};

export default ReactEditor;
