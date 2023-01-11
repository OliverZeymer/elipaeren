import Heading from "./Heading"
import useAxios from "../hooks/useAxios"
import Loader from "./Loader"
import Room from "./Room"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import { useContext } from "react"
import filterKeysToArray from "../functions/filterKeysToArray"

export default function AllRooms() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchUrl = `${bridgeIpContext}/api/${token}/groups`
  const { data, error, loading } = useAxios(fetchUrl)
  const results = filterKeysToArray(data)
  return (
    <div className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
      {!loading ? results.map((room, index) => <Room key={index} room={room} />) : <Loader />}
    </div>
  )
}
