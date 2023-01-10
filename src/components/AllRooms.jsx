import Heading from "./Heading"
import useAxios from "../hooks/useAxios"
import Loader from "./Loader"
import ComponentWrapper from "./ComponentWrapper"
import { BsDoorOpen, BsPower } from "react-icons/bs"
export default function AllRooms() {
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/groups`)
  const resultsObject = data?.data
  const results = []
  for (const key in resultsObject) {
    results.push(resultsObject[key])
  }
  console.log(results)
  return (
    <>
      <Heading h1>Rooms</Heading>
      {error && <p className="text-red text-xl">{error}</p>}
      <section className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
        {!loading ? (
          results?.map((room, index) => (
            <ComponentWrapper type="article" key={index} className="bg-lighter rounded-3xl p-6 flex items-center min-w-fit">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center ">
                  <BsDoorOpen className={room?.state?.all_on ? "text-2xl text-yellow" : "text-2xl"} />
                  <Heading h2>{room?.name}</Heading>
                </div>
                <p className="text-sm">{room?.lights?.length} lights</p>
              </div>
              <BsPower className="text-2xl ml-auto" />
            </ComponentWrapper>
          ))
        ) : (
          <Loader />
        )}
      </section>
    </>
  )
}
