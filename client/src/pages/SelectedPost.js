import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import axios from "axios";

import Loading from "../components/Loading";

import "suneditor/dist/css/suneditor.min.css";

function SelectedPost() {
  const { postId } = useParams();
  const cancelFetch = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({});

  const setOptionsObj = {
    minHeight: "70vh",
    height: "auto",
    mode: "balloon",
    resizingBar: false,
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchPost = async () => {
      try {
        cancelFetch.current = axios.CancelToken.source();
        const response = await axios.get(`/posts/${postId}`);
        setPost(response.data.post);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    setIsLoading(false);
  }, [postId]);

  console.log(post);
  return (
    <main>
      {isLoading && <Loading />}
      <h1>Selected Post</h1>
      <section>
        <SunEditor
          showToolbar={false}
          enableToolbar={false}
          setContents={post.content}
          disable={true}
          setOptions={setOptionsObj}
        />
      </section>
    </main>
  );
}

export default SelectedPost;
