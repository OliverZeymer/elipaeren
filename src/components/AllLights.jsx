import Light from "./Light"
import Loader from "./Loader"
import ScrollContainer from "./ScrollContainer"

export default function AllLights(props) {
  const { results, loading, selectedLights, handleSelect } = props

  return (
    <>
      {!loading ? (
        <div className="sm:grid sm:grid-cols-auto-fit-small flex flex-col gap-6 w-full">
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
            )
          })}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
