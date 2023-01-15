/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ComponentWrapper from "./ComponentWrapper";
import { BsDoorOpen } from "react-icons/bs";
import PowerButton from "./PowerButton";
import { useEffect, useState } from "react";
export default function Room({
  text,
  selected,
  id,
  room,
  onPress,
  allRoomsOn,
}) {
  const [isOn, setIsOn] = useState(room?.state?.all_on);
  useEffect(() => {
    allRoomsOn === undefined ? null : setIsOn(allRoomsOn);
  }, [allRoomsOn]);

  const style = {
    selected: css`
      border: 3px solid #00dac6;
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
        css={selected ? style.selected : null}
        type="article"
        className={
          isOn
            ? "bg-dark text-grey rounded-3xl p-6 flex cursor-pointer items-center min-w-fit border-[3px] border-solid border-yellow"
            : "bg-dark text-grey rounded-3xl p-6 flex cursor-pointer items-center min-w-fit border-[3px] border-solid border-transparent"
        }>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center ">
            <BsDoorOpen
              className={isOn ? "text-2xl text-yellow" : "text-2xl"}
            />
            <p className="text-xl">{room?.name}</p>
          </div>
          <p className="text-sm">{room?.lights?.length} lights</p>
        </div>
        <PowerButton id={room?.id} type="room" setIsOn={setIsOn} isOn={isOn} />
      </ComponentWrapper>
    </div>
  );
}
