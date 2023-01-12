import Heading from "../components/Heading"
import ScrollContainer from "../components/ScrollContainer"
import Tag from "../components/Tag"
import Light from "../components/Light"
import { useContext } from "react"
import useAxios from "../hooks/useAxios"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import filterKeysToArray from "../functions/filterKeysToArray"
import Loader from "../components/Loader"
import AllLights from "../components/AllLights"
import ComponentWrapper from "../components/ComponentWrapper"
import ColorPicker from "../components/ColorPicker"
import BrightnessSlider from "../components/BrightnessSlider"
import useFetch from "../hooks/useFetch"
export default function Lights() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const fetchUrl = `${bridgeIpContext}/api/${token}/lights`
  const { data, loading } = useFetch({ url: fetchUrl })
  const results = filterKeysToArray(data)
  return (
    <ComponentWrapper type="section" className="w-full flex flex-col justify-center gap-6 h-full">
      {!loading ? (
        <>
          <Heading className="mt-8">Lights ({!loading && Object.keys(data).length})</Heading>
          <ScrollContainer className="">
            <Tag text="All lights on" className="bg-red" />
            <Tag text="All lights off" className="bg-primary" />
            <Tag text="Add to room" className="bg-grey" />
            <Tag text="Add to new room" className="bg-grey" />
          </ScrollContainer>
          <AllLights results={results} loading={loading} />
          <ComponentWrapper type="div" className="flex items-center gap-12">
            <ColorPicker />
            <BrightnessSlider />
          </ComponentWrapper>
        </>
      ) : (
        <Loader />
      )}
    </ComponentWrapper>
  )
}
