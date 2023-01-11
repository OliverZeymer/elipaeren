import ComponentWrapper from "./ComponentWrapper"
import { BsDoorOpen } from "react-icons/bs"
import Heading from "./Heading"
import PowerButton from "./PowerButton"
import { useState } from "react"
export default function Room({ room }) {
  const [isOn, setIsOn] = useState(room?.state?.all_on)
  return (
    <ComponentWrapper
      type="article"
      className={
        isOn
          ? "bg-lighter text-grey rounded-3xl p-6 flex items-center min-w-fit border border-yellow"
          : "bg-lighter text-grey rounded-3xl p-6 flex items-center min-w-fit border border-transparent"
      }>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center ">
          <BsDoorOpen className={isOn ? "text-2xl text-yellow" : "text-2xl"} />
          <p className="text-xl">{room?.name}</p>
        </div>
        <p className="text-sm">{room?.lights?.length} lights</p>
      </div>
      <PowerButton id={room?.id} type="room" setIsOn={setIsOn} isOn={isOn} />
    </ComponentWrapper>
  )
}
