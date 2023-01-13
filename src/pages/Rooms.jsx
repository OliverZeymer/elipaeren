import AllRooms from "../components/AllRooms"
import Heading from "../components/Heading"
import useFetch from "../hooks/useFetch"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import { useContext, useState } from "react"
import ComponentWrapper from "../components/ComponentWrapper"
import ScrollContainer from "../components/ScrollContainer"
import Tag from "../components/Tag"
import useSelectedRoom from "../hooks/useSelectedRoom"
import filterKeysToArray from "../functions/filterKeysToArray"
import normalFetch from "../functions/normalFetch"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import ColorPicker from "../components/ColorPicker"
import BrightnessSlider from "../components/BrightnessSlider"
export default function Rooms() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchUrl = `${bridgeIpContext}/api/${token}/groups`
  const { data, error, loading } = useFetch({ url: fetchUrl })
  const results = filterKeysToArray(data)
  // selected rooms in array & handler to add or remove id's
  const { selectedRoom, handleSelect } = useSelectedRoom()

  const [allRoomsOn, setAllRoomsOn] = useState()
  const putAllUrl = `${bridgeIpContext}/api/${token}/groups/0/action`
  const putOneUrl = `${bridgeIpContext}/api/${token}/groups/${selectedRoom}/action`
  return (
    <ComponentWrapper type="section" className="w-full flex flex-col justify-center gap-6 h-full">
      <Heading h1 className="mt-8">
        Rooms ({!loading && Object.keys(data).length})
      </Heading>
      <ScrollContainer className="flex gap-1 w-full max-w-full scrollbar-hide">
        <Tag
          text="All rooms on"
          className="bg-gradient-to-r from-primary to-green-300"
          onClick={() => {
            normalFetch({
              method: "PUT",
              url: putAllUrl,
              body: JSON.stringify({ on: true }),
            })
            setAllRoomsOn(true)
          }}
        />
        <Tag
          text="All rooms off"
          className="bg-gradient-to-r from-red to-rose-500"
          onClick={() => {
            normalFetch({
              method: "PUT",
              url: putAllUrl,
              body: JSON.stringify({ on: false }),
            })
            setAllRoomsOn(false)
          }}
        />
        <Tag
          text="Create new room"
          className="bg-gradient-to-r from-purple-300 to-pink-500"
          onClick={() => {
            normalFetch({
              method: "POST",
              url: `${bridgeIpContext}/api/${token}/groups`,
              body: JSON.stringify({
                lights: ["27"],
                name: "Bunker",
                type: "Room",
                class: "Bedroom",
              }),
            })
          }}
        />
        {selectedRoom && (
          <Tag
            text="Edit Room"
            className="bg-gradient-to-r from-purple-300 to-pink-500"
            onClick={() => {
              normalFetch({
                method: "PUT",
                url: `${bridgeIpContext}/api/${token}/groups/${selectedRoom}`,
                body: JSON.stringify({
                  name: "Bunker",
                }),
              })
            }}
          />
        )}
      </ScrollContainer>
      <AllRooms results={results} loading={loading} selectedRoom={selectedRoom} handleSelect={handleSelect} allRoomsOn={allRoomsOn} />
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="flex items-center gap-12">
            <ColorPicker selectedRoom={selectedRoom} />
            <BrightnessSlider selectedRoom={selectedRoom} />
          </motion.div>
        )}
      </AnimatePresence>
    </ComponentWrapper>
  )
}
