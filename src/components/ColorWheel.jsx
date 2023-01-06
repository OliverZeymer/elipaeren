import Wheel from "@uiw/react-color-wheel"
import { useCallback, useEffect, useState } from "react"
import useAxios from "../hooks/useAxios"
import hueXYBriToRgb from "../functions/hueXYBriToRgb"
import debounce from "lodash.debounce"
export default function ColorWheel() {
  const fetchUrl = `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights`
  const { data, loading, error, put } = useAxios(`${fetchUrl}/27`)
  const item = data?.data
  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component"
    return ((r << 16) | (g << 8) | b).toString(16)
  }
  const [lampColor, setLampColor] = useState("#ffffff")
  useEffect(() => {
    if (!loading && item?.state?.on && item?.state?.xy && item?.state?.bri) {
      setLampColor(
        "#" +
          rgbToHex(
            hueXYBriToRgb(item?.state?.xy[0], item?.state?.xy[1], item?.state?.bri).r,
            hueXYBriToRgb(item?.state?.xy[0], item?.state?.xy[1], item?.state?.bri).g,
            hueXYBriToRgb(item?.state?.xy[0], item?.state?.xy[1], item?.state?.bri).b
          )
      )
    }
  }, [data])
  return (
    <>
      <Wheel
        color={lampColor}
        onChange={(color) => {
          setLampColor(color.hex)
          const debouncedFilter = debounce(() => {
            put(`${fetchUrl}/27/state`, { hue: Math.round(color?.hsl?.h * 182.04), sat: Math.round(color?.hsl?.s * 254), effect: "none", on: true })
          }, 5000)

          debouncedFilter()
        }}
      />
      <p>color: {lampColor}</p>
      <div className="w-52 h-52 rounded-xl mt-14" style={{ backgroundColor: lampColor }}></div>
    </>
  )
}
