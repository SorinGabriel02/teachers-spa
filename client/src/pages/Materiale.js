import React, { useRef, useReducer, useContext } from "react";
import PostEditor from "../components/PostEditor";

import { matsContainer } from "./Materiale.module.scss";
import { AppContext } from "../context/appContext";

const initialState = {
  isLoading: false,
  content: "",
  editMode: false,
};

const matsReducer = (state, action) => {
  switch (action.type) {
    case "editMode": {
      return {
        ...state,
        editMode: !state.editMode,
      };
    }
    default:
      return state;
  }
};

function Materiale() {
  const editorRef = useRef();
  const { isAuthenticated, isAdmin } = useContext(AppContext);
  const [state, dispatch] = useReducer(matsReducer, initialState);

  const handleClick = () => dispatch({ type: "editMode" });

  return (
    <main className={matsContainer}>
      {isAuthenticated && isAdmin && (
        <button onClick={handleClick}>
          {state.editMode ? "Salvează" : "Editează"}
        </button>
      )}
      <PostEditor forwardRef={editorRef} disable={!state.editMode} />
    </main>
  );
}

export default Materiale;
