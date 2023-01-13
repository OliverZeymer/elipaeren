import Light from "./Light"
import Loader from "./Loader"

export default function AllLights(props) {
  const { results, loading, selectedLight, handleSelect, allLightsOn } = props
  return (
    <>
      {!loading ? (
        <div className="sm:grid sm:grid-cols-auto-fit-small flex flex-col gap-6">
          {results.map((light) => {
            return (
              <Light
                key={light.id}
                text={"#" + light.id}
                id={light.id}
                light={light}
                selected={selectedLight === light.id}
                onPress={() => handleSelect(light.id)}
                allLightsOn={allLightsOn}
              />
            )
          })}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
