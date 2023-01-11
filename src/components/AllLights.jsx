import { useContext } from "react"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import filterKeysToArray from "../functions/filterKeysToArray"
import useAxios from "../hooks/useAxios"
import Light from "./Light"
import Loader from "./Loader"

export default function AllLights() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchUrl = `${bridgeIpContext}/api/${token}/lights`
  const { data, error, loading } = useAxios(fetchUrl)
  const results = filterKeysToArray(data)
  return (
    <>
      {!loading ? (
        <div className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
          {results.map((light) => {
            return <Light text={"#" + light.id} id={light.id} key={light.id} light={light} />
          })}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
