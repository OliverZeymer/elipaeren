import { useState } from "react"
import Heading from "../components/Heading"
import InputField from "../components/InputField"
export default function Home() {
  const [inputValue, setInputValue] = useState("")
  return (
    <>
      <Heading bold h1>
        Home
      </Heading>
      <InputField state={inputValue} setState={setInputValue} placeholder="Enter your name" />
    </>
  )
}
