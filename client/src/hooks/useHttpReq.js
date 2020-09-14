import { useState, useCallback, useRef } from "react";
import axios from "axios";

function useHttpReq() {
  const cancelFetch = useRef(null);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  const makeReq = useCallback(
    async (reqMethod, url, reqOptions = null, reqBody = null) => {
      try {
        cancelFetch.current = axios.CancelToken.source();
        const response = await axios[reqMethod](url, reqOptions, reqBody);
        setData(response.data);
      } catch (error) {
        setErr(error.response);
      }
    },
    []
  );

  const clearErr = () => setErr(null);

  return [data, err, makeReq, cancelFetch.current, clearErr];
}

export default useHttpReq;
