import Heading from "../components/Heading";
import ScrollContainer from "../components/ScrollContainer";
import Tag from "../components/Tag";
import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import IpContext from "../contexts/IpContext";
import TokenContext from "../contexts/TokenContext";
import filterKeysToArray from "../functions/filterKeysToArray";
import Loader from "../components/Loader";
import AllLights from "../components/AllLights";
import ComponentWrapper from "../components/ComponentWrapper";
import ColorPicker from "../components/ColorPicker";
import useselectedLight from "../hooks/useselectedLight";
import BrightnessSlider from "../components/BrightnessSlider";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import normalFetch from "../functions/normalFetch";
export default function Lights() {
  // context
  const { bridgeIpContext } = useContext(IpContext);
  const { token } = useContext(TokenContext);
  // fetch lights
  const fetchUrl = `${bridgeIpContext}/api/${token}/lights`;
  const { data, loading } = useFetch({ url: fetchUrl });
  const results = filterKeysToArray(data);
  const putUrl = `${bridgeIpContext}/api/${token}/groups/0/action`;

  // selected lights in array & handler to add or remove id's
  const { selectedLight, handleSelect } = useselectedLight();

  //if element is rendered and selectedLight is not empty, scroll to it
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && selectedLight.length > 0) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (ref.current && selectedLight.length === 0) {
      scrollTo(0, 0);
    }
  }, [selectedLight]);

  const [allLightsOn, setAllLightsOn] = useState();

  return (
    <ComponentWrapper type="section" className="w-full flex flex-col gap-6">
      {!loading ? (
        <>
          <Heading className="mt-8">
            Lights ({!loading && Object.keys(data).length})
          </Heading>
          <ScrollContainer className="flex gap-1 w-full max-w-full scrollbar-hide">
            <Tag
              text="All lights on"
              className="bg-gradient-to-r from-primary to-green-300"
              onClick={() => {
                normalFetch({
                  method: "PUT",
                  url: putUrl,
                  body: JSON.stringify({ on: true }),
                });
                setAllLightsOn(true);
              }}
            />
            <Tag
              text="All lights off"
              onClick={() => {
                normalFetch({
                  method: "PUT",
                  url: putUrl,
                  body: JSON.stringify({ on: false }),
                });
                setAllLightsOn(false);
              }}
              className="bg-gradient-to-r from-red to-rose-500"
            />
            <Tag
              text="Colorloop all lights"
              className="bg-gradient-to-r from-purple-300 to-pink-500"
              onClick={() => {
                normalFetch({
                  method: "PUT",
                  url: putUrl,
                  body: JSON.stringify({
                    bri: 254,
                    sat: 255,
                    alert: "none",
                    effect: "colorloop",
                  }),
                });
              }}
            />

            <Tag
              text="Alert all lights"
              className="bg-gradient-to-r from-rose-600 to-blue-600"
              onClick={() => {
                normalFetch({
                  method: "PUT",
                  url: putUrl,
                  body: JSON.stringify({ alert: "lselect" }),
                });
              }}
            />

            <Tag
              text="Flashbang out"
              className="bg-gradient-to-r from-white to-neutral-300"
              onClick={() => {
                normalFetch({
                  method: "PUT",
                  url: putUrl,
                  body: JSON.stringify({
                    effect: "none",
                    alert: "none",
                    hue: 32767,
                    bri: 254,
                    sat: 0,
                  }),
                });
              }}
            />

            {selectedLight && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="flex items-center gap-1">
                  <Tag text="Add to room" className="bg-grey" />
                  <Tag text="Add to new room" className="bg-grey" />
                </motion.div>
              </AnimatePresence>
            )}
          </ScrollContainer>
          <AllLights
            selectedLight={selectedLight}
            handleSelect={handleSelect}
            results={results}
            loading={loading}
            allLightsOn={allLightsOn}
          />
          <AnimatePresence>
            {selectedLight && (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="flex items-center gap-12">
                <ColorPicker selectedLight={selectedLight} />
                <BrightnessSlider selectedLight={selectedLight} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Loader />
      )}
    </ComponentWrapper>
  );
}
