import Wheel from "@uiw/react-color-wheel"
import { useContext, useState } from "react"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import useAxios from "../hooks/useAxios"
import ColorConverter from "cie-rgb-color-converter"
import { SketchPicker } from "react-color"

export default function ColorPicker() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchUrl = `${bridgeIpContext}/api/${token}/lights/32/state`
  const { put } = useAxios(fetchUrl)
  const [hex, setHex] = useState("#fff")
  return (
    <>
      <Wheel
        style={{ marginLeft: 20 }}
        color={hex}
        onChange={(color) => {
          console.log(color.hsl.h)
          setHex(color.hex)
          put(fetchUrl, {
            hue: Math.round(color.hsv.h * 182.04),
            sat: Math.round(color.hsv.s * 254),
          })
        }}
      />

      <div
        className="w-10 h-10 rounded-full"
        style={{
          backgroundColor: hex,
        }}
      />
    </>
  )
}
