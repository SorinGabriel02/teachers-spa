import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import axios from "axios";

import { AppContext } from "../context/appContext";
import Loading from "../components/Loading";

import "suneditor/dist/css/suneditor.min.css";
import {
  btnSection,
  editBtn,
  deleteBtn,
  commentsSection,
  writeComment,
} from "./SelectedPost.module.scss";

function SelectedPost() {
  const { postId } = useParams();
  const cancelFetch = useRef(null);
  const { isAdmin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

  const postEditorOptions = {
    minHeight: "70vh",
    height: "auto",
    mode: "balloon",
    resizingBar: false,
  };

  const commentEditorOptions = {
    minHeight: "50vh",
    height: "auto",
    resizingBar: false,
  };

  const handleComment = (content) => setComment(content);

  const comments =
    post.comments &&
    post.comments.map((comment) => {
      return <li key={comment.id}>{comment.content}</li>;
    });

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

  console.log(comment);
  return (
    <main>
      {isLoading && <Loading />}
      {isAdmin && (
        <section className={btnSection}>
          <button className={editBtn}>Editează Articolul</button>
          <button className={deleteBtn}>Șterge Articolul</button>
        </section>
      )}

      <section>
        <SunEditor
          showToolbar={false}
          enableToolbar={false}
          setContents={post.content}
          disable={true}
          setOptions={postEditorOptions}
          setDefaultStyle={"background-color: rgb(228, 228, 230); padding: 2%;"}
        />
      </section>
      <section className={commentsSection}>
        <h2>Comentarii:</h2>
        {post.comments && !post.comments.length ? (
          <p style={{ textAlign: "center" }}>
            Pentru moment nu sunt comentarii.
          </p>
        ) : (
          <ul>{comments}</ul>
        )}
      </section>
      <section className={writeComment}>
        <SunEditor
          onChange={handleComment}
          setEditorOptions={commentEditorOptions}
        />
      </section>
    </main>
  );
}

export default SelectedPost;
