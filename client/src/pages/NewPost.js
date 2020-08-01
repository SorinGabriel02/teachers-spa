import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../context/appContext";
import PostEditor from "../components/PostEditor";
import Loading from "../components/Loading";

function NewPost(props) {
  const history = useHistory();
  const { isAuthenticated } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState("");
  const handleChange = (content) => setEditorState(content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/posts/new",
        {
          content: editorState,
        },
        { headers: { Authorization: `Bearer ${isAuthenticated}` } }
      );
      console.log(response.data);
      history.go("/noutati");
    } catch (error) {
      console.log(error.response.status);
    }
    setIsLoading(false);
  };

  const btnDisable = !editorState ? true : false;

  return (
    <main>
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <PostEditor handleChange={handleChange} />
        <button disabled={btnDisable}>Creează</button>
      </form>
    </main>
  );
}

export default NewPost;
