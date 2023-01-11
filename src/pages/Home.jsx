import { useContext, useState } from "react"
import ComponentWrapper from "../components/ComponentWrapper"
import Heading from "../components/Heading"
import Light from "../components/Light"
import Loader from "../components/Loader"
import Room from "../components/Room"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import filterKeysToArray from "../functions/filterKeysToArray"
import useAxios from "../hooks/useAxios"
export default function Home() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchRoomsUrl = `${bridgeIpContext}/api/${token}/groups`
  const fetchLightsUrl = `${bridgeIpContext}/api/${token}/lights`
  const fetchUserUrl = `${bridgeIpContext}/api/${token}/config`
  const { data: lightsData, loading: lightsLoading } = useAxios(fetchLightsUrl)
  const { data: roomsData, loading: roomsLoading } = useAxios(fetchRoomsUrl)
  const { data: userData, loading: userLoading } = useAxios(fetchUserUrl)
  const [username, setUsername] = useState("")
  const lightsResults = filterKeysToArray(lightsData)
  const roomsResults = filterKeysToArray(roomsData)
  const limitedLights = lightsResults?.slice(0, 6)
  const limitedRooms = roomsResults?.slice(0, 6)

  const currentUser =
    userData &&
    Object.keys(userData.whitelist)
      .filter((user) => user === token)
      .map((user) => userData.whitelist[user].name)
  console.log(currentUser)
  return (
    <div className="flex flex-col justify-center h-full">
      <Heading h1 className="mb-24">
        Good Afternoon, <span className="text-primary">{currentUser ? currentUser : "..."}</span>
      </Heading>
      <div className="flex flex-col gap-12">
        {!lightsLoading && !roomsLoading ? (
          <div className="flex flex-col gap-6">
            <Heading h1 bold>
              Lights
            </Heading>
            <ComponentWrapper type="section" className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
              {limitedLights?.map((light) => {
                return <Light text={"#" + light.id} id={light.id} key={light.id} light={light} />
              })}
            </ComponentWrapper>
            <Heading h1 bold className="mt-6">
              Rooms
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
