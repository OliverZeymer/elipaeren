import ComponentWrapper from "../components/ComponentWrapper";
import Button from "../components/Button";
import useConnectBridge from "../hooks/useConnectBridge";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useState, useContext } from "react";
import InputField from "../components/InputField";
import Loader from "../components/Loader";
import TokenContext from "../contexts/TokenContext";
import IpContext from "../contexts/IpContext";
import { setCookie } from "react-use-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [discoverUrl, setDiscoverUrl] = useState(null);
  const { setToken: setTokenContext } = useContext(TokenContext);
  const { setBridgeIpContext } = useContext(IpContext);
  const [username, setUsername] = useState("");
  const { token, bridgeIp, setBridgeIp, error } = useConnectBridge(
    discoverUrl,
    username
  );
  const [loading, setLoading] = useState(false);
  const inputContainer = createRef(null);

  function connect() {
    // Check if username input is empty
    if (username.length < 1) {
      // wiggles input container
      inputContainer.current.classList.add("wiggle");
      inputContainer.current.addEventListener("animationend", () =>
        inputContainer.current.classList.remove("wiggle")
      );
      return;
    }
    setLoading(true);
    setDiscoverUrl("https://discovery.meethue.com");
  }

  useEffect(() => {
    setLoading(false);
    setDiscoverUrl(null); // reset
  }, [error]);

  // if discovery is rate limited
  function useDefaultIp() {
    setBridgeIp("http://192.168.8.100");

    document.querySelector("button").click();
  }

  if (token) {
    setCookie("hueToken", token, {
      days: 365,
      SameSite: "Lax",
      Secure: true,
    });
    setCookie("bridgeIp", bridgeIp, {
      days: 365,
      SameSite: "Lax",
      Secure: true,
    });
    setTokenContext(token);
    setBridgeIpContext(bridgeIp);
    navigate("/");
  }

  return (
    <div className="flex flex-col">
      {loading && <Loader color="#E1E1E1" size="125px" />}
      {!loading && (
        <>
          <ComponentWrapper
            type="div"
            className="bg-lighter p-7 rounded-3xl max-w-[340px] w-full mb-2"
          >
            <p className="mb-5">
              Make sure your bridge is{" "}
              <span className="font-medium">powered on</span> and{" "}
              <span className="font-medium">ethernet plugged in.</span>
            </p>
            <p className="mb-5">
              Now{" "}
              <span className="text-primary font-medium">
                press the bridge button
              </span>
            </p>
            <p>When pressed, write your name and continue.</p>
          </ComponentWrapper>
          <div ref={inputContainer}>
            <InputField
              state={username}
              setState={setUsername}
              placeholder="Input your name..."
            />
          </div>
          <Button
            className="bg-primary text-dark mt-2 ml-auto"
            text={error ? "Retry Connection" : "Connect Now"}
            onClick={() => connect()}
          />
        </>
      )}
      {error && !loading && (
        <p className="text-center text-red font-medium mt-4 capitalize">
          {error?.message}
        </p>
      )}
      {error && !bridgeIp && (
        <p
          onClick={() => useDefaultIp()}
          className="text-center text-primary font-medium mt-2 capitalize cursor-pointer"
        >
          Use default ip address...
        </p>
      )}
    </div>
  );
}
