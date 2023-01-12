import { BsPower } from "react-icons/bs";
import { useContext } from "react";
import IpContext from "../contexts/IpContext";
import TokenContext from "../contexts/TokenContext";
import normalFetch from "../functions/normalFetch";

export default function PowerButton({ id, type, setIsOn, isOn }) {
  const { bridgeIpContext } = useContext(IpContext);
  const { token } = useContext(TokenContext);

  const baseUrl = `${bridgeIpContext}/api/${token}/`;
  const typeUrl = type === "room" ? "groups" : "lights";
  const stateUrl = type === "room" ? "action" : "state";
  const fetchUrl = `${baseUrl}${typeUrl}/${id}/${stateUrl}`;

  function handleClick() {
    normalFetch({
      url: fetchUrl,
      method: "PUT",
      body: JSON.stringify({ on: !isOn }),
    });
    setIsOn((prevState) => !prevState);
  }

  return (
    <button onClick={() => handleClick()} className="text-3xl ml-auto">
      <BsPower className="pointer-events-none" />
    </button>
  );
}
