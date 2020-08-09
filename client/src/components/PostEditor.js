import React, { useRef } from "react";
import PropTypes from "prop-types";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { editContainer } from "./PostEditor.module.scss";

const editorOptions = {
  toolbarContainer: ".postToolbarContainer",
  mode: "baloon",
  height: "auto",
  minWidth: "95vw",
  minHeight: "53vh",
  placeholder: ` Imaginile trebuie să aibă sub 1.5MB.
     Apasă butonul de full screen pentru o experiență mai bună.`,
  imageUploadSizeLimit: 1500000,
  imageUploadUrl: "http://localhost:8080/api/media/images/new",
  showPathLabel: false,
  resizingBar: false,
  buttonList: [
    ["undo", "redo"],
    [
      "formatBlock",
      "paragraphStyle",
      "textStyle",
      "font",
      "fontColor",
      "hiliteColor",
      "align",
    ],
    ["bold", "italic", "underline", "strike"],
    ["removeFormat"],
    ["blockquote", "list", "table"],
    ["image", "link", "video"],
    ["fullScreen", "preview", "print", "codeView"],
  ],
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
    "h1",
    "h2",
    "h3",
    "h4",
    // "blockquote": range format, "pre": free format, "Other tags": replace format
  ],
};

function PostEditor(props) {
  const ref = useRef();

  const handleChange = (content) => {
    props.handleChange(content);
  };

  return (
    <div className={editContainer}>
      <SunEditor
        ref={ref}
        disable={props.disable}
        showToolbar={!props.disable}
        setDefaultStyle={props.setDefaultStyle}
        setContents={props.editorContent}
        setOptions={editorOptions}
        onChange={handleChange}
      />
    </div>
  );
}

PostEditor.defaultProps = {
  disable: false,
  editorContent: "",
  setDefaultStyle: "background-color: whitesmoke; padding: 2%;",
};

PostEditor.propTypes = {
  editorContent: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  setDefaultStyle: PropTypes.string,
};

export default PostEditor;
