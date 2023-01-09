import ComponentWrapper from "../components/ComponentWrapper";
import Button from "../components/Button";
import useConnectBridge from "../hooks/useConnectBridge";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import InputField from "../components/InputField";
import Loader from "../components/Loader";

export default function Login() {
  const [discoverUrl, setDiscoverUrl] = useState(null);
  const [username, setUsername] = useState("");
  const { token, error } = useConnectBridge(discoverUrl, username);
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

  useEffect(() => {
    console.log("%cGreat success! Token: " + token, "color: green;");
  }, [token]);

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
        <p className="text-center text-red font-medium mt-4">
          {error?.message}
        </p>
      )}
    </div>
  );
}
