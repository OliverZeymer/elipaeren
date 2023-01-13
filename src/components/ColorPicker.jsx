import Wheel from "@uiw/react-color-wheel"
import { useContext, useEffect, useState } from "react"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import useFetch from "../hooks/useFetch"
import normalFetch from "../functions/normalFetch"
import hueXyBriToRgb from "../functions/hueXYBriToRgb"
import _ from "lodash"
export default function ColorPicker({ selectedLight }) {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const putUrl = selectedLight ? `${bridgeIpContext}/api/${token}/lights/${selectedLight}/state` : ""
  const fetchUrl = selectedLight ? `${bridgeIpContext}/api/${token}/lights/${selectedLight}` : ""
  const { data, loading } = useFetch({ url: fetchUrl })
  const [hex, setHex] = useState("#fff")
  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component"
    return "#" + ((r << 16) | (g << 8) | b).toString(16)
  }

  useEffect(() => {
    if (!loading) {
      setHex(
        rgbToHex(
          hueXyBriToRgb(data?.state?.xy[0], data?.state?.xy[1], data?.state?.bri).r,
          hueXyBriToRgb(data?.state?.xy[0], data?.state?.xy[1], data?.state?.bri).g,
          hueXyBriToRgb(data?.state?.xy[0], data?.state?.xy[1], data?.state?.bri).b
        )
      )
    }
  }, [data])

  const throttledHandleChange = _.throttle(handleChange, 500)

  function handleChange(color) {
    const bodyObject = {
      colormode: "hs",
      effect: "none",
      hue: Math.round(color.hsv.h * 182.04),
      sat: Math.round(color.hsv.s * 2.54),
    }
    normalFetch({
      url: putUrl,
      method: "PUT",
      body: JSON.stringify(bodyObject),
    })
    window.addEventListener("mouseup", () => {
      setHex(color.hex)
    })
    window.addEventListener("mousedown", () => {
      setHex(color.hex)
    })
  }

  return (
    <Wheel
      width={256}
      height={256}
      color={hex}
      onChange={(color) => {
        throttledHandleChange(color)
      }}
    />
  )
}
