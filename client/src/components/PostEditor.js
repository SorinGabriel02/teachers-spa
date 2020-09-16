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
  placeholder: ` Imaginile trebuie să aibă sub 1MB.
     Apasă butonul de full screen pentru o experiență mai bună.`,
  imageUploadSizeLimit: 1000000,
  imageUploadUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/media/images/new"
      : "https://profesoridesprijin.herokuapp.com/api/media/images/new",
  showPathLabel: false,
  resizingBar: false,
  imageAccept: ".jpg, .jpeg, .png, .webp",
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
  formats: ["p", "h1", "h2", "h3", "h4"],
};

function PostEditor(props) {
  const ref = useRef(null);

  const handleChange = (content) => {
    props.handleChange(content);
  };

  console.log(ref.current?.editor.getImagesInfo());

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
  handleImages: PropTypes.func,
  setDefaultStyle: PropTypes.string,
};

export default PostEditor;
