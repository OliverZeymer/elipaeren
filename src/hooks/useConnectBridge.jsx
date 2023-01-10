import useAxios from "./useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function useConnectBridge(url, username) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [bridgeIp, setBridgeIp] = useState(null);

  useEffect(() => {
    (async () => {
      // async IIFE
      if (url) {
        try {
          await sleep(1500);
          // if no bridge ip is set, discover bridges on network
          if (bridgeIp === null) {
            // discover bridges on network
            const discoveryRes = await fetch("https://discovery.meethue.com");
            const discoveryStatus = discoveryRes.status;
            // status code errors
            if (discoveryStatus < 200 || discoveryStatus > 299) {
              throw new Error(
                "error while discovering bridges... " + discoveryStatus
              );
            }
            // no bridges found
            const discoveryJson = await discoveryRes.json();
            if (discoveryJson.length < 1) {
              throw new Error("no bridges found on your network...");
            }
            // check for bridge ip (needs to be made)
            setBridgeIp(
              "http://" +
                discoveryJson[discoveryJson.length - 1].internalipaddress
            );
          }

          // get client token
          const bridgeRes = await fetch(bridgeIp + "/api", {
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify({
              devicetype: "elipaeren#" + username,
            }),
          });
          // status code errors
          const bridgeStatus = bridgeRes.status;
          if (bridgeStatus < 200 || bridgeStatus > 299) {
            throw new Error("error while communicating with bridge...");
          }
          // bridge errors
          const bridgeJson = await bridgeRes.json();
          if (bridgeJson[0].error) {
            throw new Error("link button not pressed");
          }

          // auth success
          const token = bridgeJson[0].success.username;
          setToken(token);
        } catch (error) {
          setError(error);
        }
      }
    })();
  }, [url, username, bridgeIp]);

  return { token, bridgeIp, setBridgeIp, error };
}
