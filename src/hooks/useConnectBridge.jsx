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
          await sleep(1500);
          /*
          // discover bridges on network
          const discoveryRes = await fetch("https://discovery.meethue.com");
          const discoveryStatus = discoveryRes.status;
          // status code errors
          if (discoveryStatus < 200 || discoveryStatus > 299) {
            throw new Error(discoveryRes.statusText);
          }
          // no bridges found
          const discoveryJson = await discoveryRes.json();
          if (discoveryJson.length < 1) {
            throw new Error("no bridges found on network...");
          }
          */

          // check for bridge ip (needs to be made)
          const bridgeIp = "http://192.168.8.100";

          // get client token
          const bridges = await fetch(bridgeIp + "/api", {
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify({
              devicetype: "elipaeren#" + username,
            }),
          });

          if (discoveryStatus < 200 || discoveryStatus > 299) {
            throw new Error(discoveryRes.statusText);
          }
          console.log(myBridgeRes);
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
