import Heading from "../components/Heading";
import ScrollContainer from "../components/ScrollContainer";
import Tag from "../components/Tag";
import { useContext } from "react";
import useFetch from "../hooks/useFetch";
import IpContext from "../contexts/IpContext";
import TokenContext from "../contexts/TokenContext";
import filterKeysToArray from "../functions/filterKeysToArray";
import Loader from "../components/Loader";
import AllLights from "../components/AllLights";
import ComponentWrapper from "../components/ComponentWrapper";
import ColorPicker from "../components/ColorPicker";
import useSelected from "../hooks/useSelected";
import BrightnessSlider from "../components/BrightnessSlider";

export default function Lights() {
  // context
  const { bridgeIpContext } = useContext(IpContext);
  const { token } = useContext(TokenContext);

  // fetch lights
  const fetchUrl = `${bridgeIpContext}/api/${token}/lights`;
  const { data, loading } = useFetch({ url: fetchUrl });
  const results = filterKeysToArray(data);

  // selected lights in array & handler to add or remove id's
  const { selected, handleSelect } = useSelected();

  return (
    <ComponentWrapper
      type="section"
      className="w-full flex flex-col justify-center gap-6"
    >
      {!loading ? (
        <>
          <Heading className="mt-8">
            Lights ({!loading && Object.keys(data).length})
          </Heading>
          <ScrollContainer className="flex gap-1 w-full max-w-full">
            <Tag text="All lights on" className="bg-red" />
            <Tag text="All lights off" className="bg-primary" />
            {selected.length > 0 && (
              <>
                <Tag text="Add to room" className="bg-grey" />
                <Tag text="Add to new room" className="bg-grey" />
              </>
            )}
          </ScrollContainer>
          <AllLights
            selectedLights={selected}
            handleSelect={handleSelect}
            results={results}
            loading={loading}
          />
          {selected.length > 0 && (
            <div className="flex gap-6">
              <ColorPicker />
              <BrightnessSlider />
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </ComponentWrapper>
  );
}
