/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ComponentWrapper from "./ComponentWrapper";
import { BsLightbulbOffFill, BsLightbulbFill, BsPower } from "react-icons/bs";

export default function Light({ isOn, text, selected }) {
  const style = {
    selected: css`
      padding: 18px;
      border: 2px solid #e1e1e1;
    `,
    notSelected: css`
      padding: 20px;
    `,
  };

  return (
    <ComponentWrapper
      css={selected ? style.selected : style.notSelected}
      type="div"
      className="rounded-3xl cursor-pointer bg-lighter sm:w-[300px] w-[220px] flex text-grey align-center"
    >
      {!isOn ? <BsLightbulbOffFill className="text-2xl" /> : null}
      {isOn ? <BsLightbulbFill className="text-2xl text-yellow" /> : null}
      <p className="ml-3">{text}</p>
      <BsPower className="text-2xl ml-auto" />
    </ComponentWrapper>
  );
}
