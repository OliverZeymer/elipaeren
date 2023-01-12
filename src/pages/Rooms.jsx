import AllRooms from "../components/AllRooms"
import Heading from "../components/Heading"
import useAxios from "../hooks/useAxios"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import { useContext } from "react"
import filterKeysToArray from "../functions/filterKeysToArray"
import ComponentWrapper from "../components/ComponentWrapper"
export default function Rooms() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchUrl = `${bridgeIpContext}/api/${token}/groups`
  const { data, error, loading } = useAxios(fetchUrl)
  return (
    <ComponentWrapper type="section" className="w-full flex flex-col justify-center gap-6 h-full">
      <Heading h1 className="mt-8">
        Rooms ({!loading && Object.keys(data).length})
      </Heading>
      <AllRooms />
    </ComponentWrapper>
  )
}
