import { BsPower } from "react-icons/bs"
import useAxios from "../hooks/useAxios"
export default function PowerButton({ id, type, setIsOn, isOn }) {
  const fetchUrl = `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/${type === "room" ? "groups" : "lights"}/${id}/${
    type === "room" ? "action" : "state"
  }`
  const { put } = useAxios(fetchUrl)
  return (
    <button
      onClick={() => {
        setIsOn(!isOn)
        put(fetchUrl, { on: isOn ? false : true })
      }}
      className="text-3xl ml-auto">
      <BsPower />
    </button>
  )
}
