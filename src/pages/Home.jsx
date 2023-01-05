import H1 from "../components/H1"
import useAxios from "../hooks/useAxios"
import Loader from "../components/Loader"

export default function Home() {
  const { data, loading, error } = useAxios(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27`)
  if (!loading) console.log(data?.data)
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <H1>Home</H1>

      {loading ? (
        <Loader />
      ) : (
        <section>
          <h2>
            <span className="font-semibold">Name: </span>
            {data?.data?.name}
          </h2>
          <p>{data?.data?.state?.on ? "On" : "Off"}</p>
          <p>{data?.data?.state?.bri}</p>
          <p>{data?.data?.state?.hue}</p>
          <p>{data?.data?.state?.sat}</p>
          <p>{data?.data?.state?.ct}</p>
          <p>{data?.data?.state?.alert}</p>
          <p>{data?.data?.state?.effect}</p>
        </section>
      )}
    </main>
  )
}
