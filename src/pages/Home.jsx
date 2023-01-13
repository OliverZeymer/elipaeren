import { useContext } from "react"
import { Link } from "react-router-dom"
import ComponentWrapper from "../components/ComponentWrapper"
import Heading from "../components/Heading"
import Light from "../components/Light"
import Loader from "../components/Loader"
import Room from "../components/Room"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import filterKeysToArray from "../functions/filterKeysToArray"
import useFetch from "../hooks/useFetch"
export default function Home() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchRoomsUrl = `${bridgeIpContext}/api/${token}/groups`
  const fetchLightsUrl = `${bridgeIpContext}/api/${token}/lights`
  const fetchUserUrl = `${bridgeIpContext}/api/${token}/config`
  const { data: lightsData, loading: lightsLoading } = useFetch({
    url: fetchLightsUrl,
  })
  const { data: roomsData, loading: roomsLoading } = useFetch({
    url: fetchRoomsUrl,
  })
  const { data: userData, loading: userLoading } = useFetch({
    url: fetchUserUrl,
  })
  const lightsResults = filterKeysToArray(lightsData)
  const roomsResults = filterKeysToArray(roomsData)
  const limitedLights = lightsResults?.slice(0, 6)
  const limitedRooms = roomsResults?.slice(0, 6)
  const currentUser =
    userData &&
    Object.keys(userData.whitelist)
      .filter((user) => user === token)
      .map((user) => userData.whitelist[user].name)
  function getTimeOfDay() {
    const date = new Date()
    const hours = date.getHours()
    if (hours < 12) {
      return "Good morning"
    } else if (hours >= 12 && hours <= 17) {
      return "Good afternoon"
    } else {
      return "Good evening"
    }
  }
  const greeting = getTimeOfDay()
  return (
    <div className="flex flex-col justify-center h-full">
      <Heading h1 className="my-8 text-center sm:text-left">
        {greeting}, <span className="text-primary">{currentUser ? currentUser.toString().split("#")[1] : "user"}</span>
      </Heading>
      <div className="flex flex-col gap-12">
        {!lightsLoading && !roomsLoading ? (
          <div className="flex flex-col gap-6">
            <Heading h2 big bold>
              <Link to="/lights">Lights</Link>
            </Heading>
            <ComponentWrapper type="section" className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
              {limitedLights?.map((light) => {
                return <Light text={"#" + light.id} id={light.id} key={light.id} light={light} />
              })}
            </ComponentWrapper>
            <Heading h2 big bold className="mt-6">
              <Link to="/rooms">Rooms</Link>
            </Heading>
            <ComponentWrapper type="section" className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
              {limitedRooms?.map((room, index) => {
                return <Room key={index} room={room} />
              })}
            </ComponentWrapper>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}
