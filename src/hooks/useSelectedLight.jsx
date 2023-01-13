import { useState } from "react"

export default function useSelectedLight() {
  const [selectedLight, setselectedLight] = useState()

  const handleSelect = (id) => {
    // light already selected, remove it's id from selectedLight array
    if (selectedLight === id) {
      setselectedLight(selectedLight !== id)
      return
    }
    // select light
    setselectedLight(id)
  }

  return { selectedLight, handleSelect }
}
