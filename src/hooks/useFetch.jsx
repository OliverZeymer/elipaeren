// Methods supported [PATCH, DELETE, POST, GET]

import { useEffect, useState } from "react";

export default function useFetch({ url, method, headers, body }) {
  // states that will be returned as object
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    // IIFE for using async/await
    (async () => {
      try {
        const res = await fetch(url, {
          method: method ? method : "GET",
          headers: headers ? headers : { "Content-Type": "application/json" },
          body: body || null,
        });

        // stauts code handling
        if (res.status < 200 || res.status >= 300) {
          throw new Error(res.status);
        }

        const json = await res.json();

        // set states
        setLoading(false);
        setData(json);
      } catch (err) {
        // error handling
        console.error(err);
        setLoading(false);
        setError(err);
      }
    })();
  }, [url, method, headers, body]);

  return { data, loading, error };
}
