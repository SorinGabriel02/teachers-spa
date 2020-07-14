import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { editContainer } from "./PostEditor.module.scss";

const setOptionsObj = {
  height: "auto",
  placeholder: "Continutul post-ului...",
  buttonList: [
    [
      "formatBlock",
      "paragraphStyle",
      "textStyle",
      "font",
      "fontColor",
      "hiliteColor",
      "align",
    ],
    ["bold", "italic", "underline"],
    ["blockquote", "list"],
    ["image", "link", "video"],
  ],
  value: props.editorContent || null,
  minHeight: "53vh",
  font: [
    "Roboto",
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "tahoma",
    "Trebuchet MS",
    "Verdana",
  ],
  formats: [
    "p",
    "blockquote",
    "pre",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    // "blockquote": range format, "pre": free format, "Other tags": replace format
  ],
};

function PostEditor(props) {
  return (
    <div className={editContainer}>
      <SunEditor setOptions={setOptions} />
    </div>
  );
}

export default PostEditor;
