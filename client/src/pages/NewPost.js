import React, { useState } from "react";
import axios from "axios";

import PostEditor from "../components/PostEditor";

function NewPost(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editorState, setEditorState] = useState();
  const handleChange = (content) => setEditorState(content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/posts/new", {
        title,
        author,
        editorState,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const btnDisable = !editorState || !title.length ? true : false;

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="title">Alege un titlu pentru post</label>
        <input
          autoComplete="off"
          minLength={10}
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="author">Numele autorului:</label>
        <input
          autoComplete="off"
          minLength={5}
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <PostEditor handleChange={handleChange} />
        <button disabled={btnDisable}>Creează</button>
      </form>
    </main>
  );
}

export default NewPost;
