/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import ComponentWrapper from "./ComponentWrapper"
import { BsLightbulbOffFill, BsLightbulbFill } from "react-icons/bs"
import PowerButton from "./PowerButton"
import { useEffect, useState } from "react"

export default function Light({ text, selected, id, light, onPress, allLightsOn }) {
  const [isOn, setIsOn] = useState(light?.state?.on)
  useEffect(() => {
    allLightsOn === undefined ? null : setIsOn(allLightsOn)
  }, [allLightsOn])

  const style = {
    selected: css`
      border: 3px solid #00dac6;
    `,
  }

  const handleClick = (e) => {
    if (onPress && e.target.tagName !== "BUTTON") {
      onPress()
    }
  }

  return (
    <div onClick={handleClick}>
      <ComponentWrapper
        css={selected ? style.selected : null}
        type="article"
        className={
          isOn
            ? "bg-dark text-grey rounded-3xl p-5 flex items-center min-w-fit cursor-pointer border-yellow border-[3px] border-solid"
            : "bg-dark text-grey rounded-3xl p-5 flex items-center min-w-fit cursor-pointer border-[3px] border-solid border-dark"
        }>
        {!isOn ? <BsLightbulbOffFill className="text-2xl" /> : null}
        {isOn ? <BsLightbulbFill className="text-2xl text-yellow" /> : null}
        <p className="ml-3 text-lg select-none">{text}</p>
        <PowerButton id={id} isOn={isOn} setIsOn={setIsOn} type="light" />
      </ComponentWrapper>
    </div>
  )
}
