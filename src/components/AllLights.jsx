import Light from "./Light"
import Loader from "./Loader"

export default function AllLights({ results, loading }) {
  return (
    <>
      {!loading ? (
        <div className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
          {results.map((light) => {
            return <Light text={"#" + light.id} id={light.id} key={light.id} light={light} />
          })}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
