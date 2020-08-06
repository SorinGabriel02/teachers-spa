import { useState, useRef } from "react";
import axios from "axios";

function useHttpReq() {
  const cancelFetch = useRef(null);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  async function makeReq(reqMethod, url, reqBody, reqOptions) {
    try {
      cancelFetch.current = axios.CancelToken.source();
      const response = await axios[reqMethod](url, reqBody, reqOptions);
      console.log(response.data);
      return setData(response.data);
    } catch (error) {
      console.log(error.response);
      return setErr(error.response);
    }
  }

  return [data, err, makeReq, cancelFetch.current];
}

export default useHttpReq;
