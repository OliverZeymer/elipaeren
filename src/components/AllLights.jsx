import Light from "./Light";
import Loader from "./Loader";
import ScrollContainer from "./ScrollContainer";

export default function AllLights(props) {
  const { results, loading, selectedLights, handleSelect } = props;

  return (
    <>
      {!loading ? (
        <ScrollContainer className="w-[100%]">
          <div className="grid grid-cols-3 w-[100%] min-w-[600px] gap-x-3 gap-y-2">
            {results.map((light) => {
              return (
                <Light
                  key={light.id}
                  text={"#" + light.id}
                  id={light.id}
                  light={light}
                  selected={selectedLights.includes(light.id)}
                  onPress={() => handleSelect(light.id)}
                />
              );
            })}
          </div>
        </ScrollContainer>
      ) : (
        <Loader />
      )}
    </>
  );
}
