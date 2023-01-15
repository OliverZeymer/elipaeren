import Wheel from "@uiw/react-color-wheel";
import { useContext, useEffect, useState } from "react";
import IpContext from "../contexts/IpContext";
import TokenContext from "../contexts/TokenContext";
import useFetch from "../hooks/useFetch";
import normalFetch from "../functions/normalFetch";
import hueXyBriToRgb from "../functions/hueXYBriToRgb";
import _ from "lodash";
export default function ColorPicker({ selectedLight, selectedRoom }) {
  const { bridgeIpContext } = useContext(IpContext);
  const { token } = useContext(TokenContext);
  const putUrl = selectedLight
    ? `${bridgeIpContext}/api/${token}/lights/${selectedLight}/state`
    : `${bridgeIpContext}/api/${token}/groups/${selectedRoom}/action`;
  const fetchUrl = selectedLight
    ? `${bridgeIpContext}/api/${token}/lights/${selectedLight}`
    : `${bridgeIpContext}/api/${token}/groups/${selectedRoom}`;
  const { data, loading } = useFetch({ url: fetchUrl });
  const [hex, setHex] = useState("#fff");
  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return "#" + ((r << 16) | (g << 8) | b).toString(16);
  }

  useEffect(() => {
    if ((!loading && data?.state?.xy) || (!loading && data?.action?.xy)) {
      setHex(
        rgbToHex(
          hueXyBriToRgb(
            selectedLight ? data?.state?.xy[0] : data?.action?.xy[0],
            selectedLight ? data?.state?.xy[1] : data?.action?.xy[1],
            selectedLight ? data?.state?.bri : data?.action?.bri
          ).r,
          hueXyBriToRgb(
            selectedLight ? data?.state?.xy[0] : data?.action?.xy[0],
            selectedLight ? data?.state?.xy[1] : data?.action?.xy[1],
            selectedLight ? data?.state?.bri : data?.action?.bri
          ).g,
          hueXyBriToRgb(
            selectedLight ? data?.state?.xy[0] : data?.action?.xy[0],
            selectedLight ? data?.state?.xy[1] : data?.action?.xy[1],
            selectedLight ? data?.state?.bri : data?.action?.bri
          ).b
        )
      );
    }
  }, [data]);
  const throttledHandleChange = _.throttle(handleChange, 500);

  function handleChange(color) {
    const bodyObject = {
      effect: "none",
      hue: Math.round(color.hsv.h * 182.04),
      sat: Math.round(color.hsv.s * 2.54),
    };
    normalFetch({
      url: putUrl,
      method: "PUT",
      body: JSON.stringify(bodyObject),
    });
    window.addEventListener("mouseup", () => {
      setHex(color.hex);
    });
    window.addEventListener("mousedown", () => {
      setHex(color.hex);
    });
  }

  return (
    <Wheel
      width={256}
      height={256}
      color={hex}
      onChange={(color) => {
        throttledHandleChange(color);
      }}
    />
  );
}
