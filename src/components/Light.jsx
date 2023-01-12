/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ComponentWrapper from "./ComponentWrapper";
import { BsLightbulbOffFill, BsLightbulbFill } from "react-icons/bs";
import PowerButton from "./PowerButton";
import { useState } from "react";

export default function Light({ text, selected, id, light, onPress }) {
  const [isOn, setIsOn] = useState(light?.state?.on);

  const style = {
    selected: css`
      padding: 17px;
      border: 3px solid #e1e1e1;
    `,
    notSelected: css`
      padding: 20px;
    `,
  };

  const handleClick = (e) => {
    if (onPress && e.target.tagName !== "BUTTON") {
      onPress();
    }
  };

  return (
    <div onClick={handleClick}>
      <ComponentWrapper
        css={selected ? style.selected : style.notSelected}
        type="article"
        className="bg-dark text-grey rounded-3xl p-6 flex items-center min-w-fit cursor-pointer"
      >
        {!isOn ? <BsLightbulbOffFill className="text-2xl" /> : null}
        {isOn ? <BsLightbulbFill className="text-2xl text-yellow" /> : null}
        <p className="ml-3 select-none">{text}</p>
        <PowerButton id={id} isOn={isOn} setIsOn={setIsOn} type="light" />
      </ComponentWrapper>
    </div>
  );
}
