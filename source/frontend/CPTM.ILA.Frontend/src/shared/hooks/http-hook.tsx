import { useCallback, useEffect, useRef, useState } from "react";

import HttpException from "./../common/http-exception";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isWarning, setIsWarning] = useState(false);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers = {}
    ) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
          credentials: "include",
        });
        console.log("response: ", response);

        const responseData = await response.json();
        console.log("responseData: ", responseData);

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (!response.ok) {
          throw new HttpException(response.status, responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (error: any) {
        console.log("hook error log: ", error);

        setIsLoading(false);
        setError(error.message);
        if (error.status > 402 && error.status < 500) {
          setIsWarning(true);
        }
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
      setIsLoading(false);
      setError(null);
    };
  }, []);

  return { isLoading, error, isWarning, sendRequest, clearError };
};
