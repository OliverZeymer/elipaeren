import ColorWheel from "../components/ColorWheel"
import H1 from "../components/H1"
import Lamps from "../components/Lamps"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <H1>Home</H1>
      <Lamps />
      <ColorWheel />
    </main>
  )
}
