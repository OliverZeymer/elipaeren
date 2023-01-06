import useAxios from "../hooks/useAxios"
import Loader from "../components/Loader"
import { BsPower } from "react-icons/bs"
export default function Lamps() {
  const fetchUrl = `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights`
  const { data, loading, error, put } = useAxios(`${fetchUrl}/27`)

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <h2>
            <span className="font-semibold">Name: </span>
            {data?.data?.name}
          </h2>
          <p>{data?.data?.state?.on ? "On" : "Off"}</p>
          <p>{data?.data?.state?.bri}</p>
          <p>{data?.data?.state?.hue}</p>
          <p>{data?.data?.state?.sat}</p>
          <p>{data?.data?.state?.ct}</p>
          <p>{data?.data?.state?.effect}</p>
          <button onClick={() => put(`${fetchUrl}/27/state`, { on: !data?.data?.state?.on })}>
            <BsPower size={80} />
          </button>
        </section>
      )}
    </section>
  )
}
