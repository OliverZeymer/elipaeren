import Wheel from "@uiw/react-color-wheel"
import { useContext, useEffect, useState } from "react"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import useAxios from "../hooks/useAxios"
import hueXyBriToRgb from "../functions/hueXYBriToRgb"

export default function ColorPicker() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const putUrl = `${bridgeIpContext}/api/${token}/lights/32/state`
  const fetchUrl = `${bridgeIpContext}/api/${token}/lights/32`
  const { put } = useAxios(putUrl)
  const { data, loading } = useAxios(fetchUrl)
  const [hex, setHex] = useState("#fff")

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component"
    return "#" + ((r << 16) | (g << 8) | b).toString(16)
  }

  useEffect(() => {
    if (!loading) {
      console.log(data)
      setHex(
        rgbToHex(
          hueXyBriToRgb(data?.state?.xy[0], data?.state?.xy[1], data?.state?.bri).r,
          hueXyBriToRgb(data?.state?.xy[0], data?.state?.xy[1], data?.state?.bri).g,
          hueXyBriToRgb(data?.state?.xy[0], data?.state?.xy[1], data?.state?.bri).b
        )
      )
    }
  }, [data])

  return (
    <Wheel
      style={{ marginLeft: 20 }}
      color={hex}
      onChange={(color) => {
        console.log(color.hsl.h)
        setHex(color.hex)
        put(putUrl, {
          on: true,
          colormode: "hs",
          hue: Math.round(color.hsv.h * 182.04),
          sat: Math.round(color.hsv.s * 254),
        })
      }}
    />
  )
}
