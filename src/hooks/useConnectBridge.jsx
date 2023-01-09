import useAxios from "./useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function useConnectBridge(url, username) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      // async IIFE
      if (url) {
        try {
          // discover bridges on network
          await sleep(2000);
          const bridgesRes = await fetch("https://discovery.meethue.com");
          if (!bridgesRes.status < 300 || bridgesRes.status >= 200) {
            throw new Error("Error... status code: " + bridgesRes.status);
          }
          // check for bridge ip (needs to be made)
          const bridgeIp = "http://192.168.1.135";
          // get client token
          const myBridgeRes = await fetch(bridgeIp + "/api", {
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify({
              devicetype: "elipaeren#" + username,
            }),
          });
          const error = myBridgeRes[0].error.description || null;
          const token = myBridgeRes[0].success.username || null;
          // auth errors
          if (error) {
            // maybe without the [0]
            throw new Error(error);
          }
          // great success
          if (token) {
            setToken(token);
          }
        } catch (error) {
          setError(error);
        }
      }
    })();
  }, [url, username]);

  return { token, error };
}
