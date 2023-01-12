/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import ComponentWrapper from "./ComponentWrapper"
import { BsLightbulbOffFill, BsLightbulbFill } from "react-icons/bs"
import PowerButton from "./PowerButton"
import { useState } from "react"

export default function Light({ text, selected, id, light }) {
  const [isOn, setIsOn] = useState(light?.state?.on)
  const style = {
    selected: css`
      padding: 18px;
      border: 1px solid #e1e1e1;
    `,
    notSelected: css`
      padding: 20px;
    `,
  }
  return (
    <ComponentWrapper
      css={selected ? style.selected : style.notSelected}
      type="article"
      className={
        isOn
          ? "bg-dark text-grey rounded-3xl p-6 flex items-center min-w-fit border border-yellow"
          : "bg-dark text-grey rounded-3xl p-6 flex items-center min-w-fit border border-transparent"
      }>
      {!isOn ? <BsLightbulbOffFill className="text-2xl" /> : null}
      {isOn ? <BsLightbulbFill className="text-2xl text-yellow" /> : null}
      <p className="ml-3">{text}</p>
      <PowerButton id={id} isOn={isOn} setIsOn={setIsOn} type="light" />
    </ComponentWrapper>
  )
}
