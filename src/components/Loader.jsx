import { Puff } from "react-loading-icons"

export default function Loader({ color, size }) {
  return <Puff stroke={color ? color : "white"} width={size ? size : 100} height={size ? size : 100} className="w-full mx-auto" />
}
