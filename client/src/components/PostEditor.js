import React from "react";
import PropTypes from "prop-types";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { editContainer } from "./PostEditor.module.scss";
function PostEditor(props) {
  const setOptionsObj = {
    height: "auto",
    placeholder: "Continutul post-ului...",
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
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      // "blockquote": range format, "pre": free format, "Other tags": replace format
    ],
    imageUploadSizeLimit: 1500000,
    imageUploadUrl: "http://localhost:8080/api/media/images/new",
  };

  const handleChange = (content) => {
    props.handleChange(content);
  };

  return (
    <div className={editContainer}>
      <SunEditor
        setContents={props.editorContent}
        setOptions={setOptionsObj}
        onChange={handleChange}
      />
    </div>
  );
}

PostEditor.defaultProps = {
  editorContent: "<p>Spor la treabă!</p>",
};

PostEditor.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default PostEditor;
