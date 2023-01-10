import ComponentWrapper from "../components/ComponentWrapper"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export default function Connect() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <ComponentWrapper type="div" className="bg-lighter p-7 rounded-3xl max-w-[340px] w-full">
        <p className="font-medium text-red mb-3">Before using this app you must connect your bridge-system.</p>
        <p>Luckily, it is very simple!</p>
      </ComponentWrapper>
      <Button className="bg-primary text-dark mt-2 ml-auto" onClick={() => navigate("/login")}>
        Continue
      </Button>
    </div>
  )
}
