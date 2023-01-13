import { useState } from "react"

export default function useSelectedRoom() {
  const [selectedRoom, setselectedRoom] = useState()

  const handleSelect = (id) => {
    // Room already selected, remove it's id from selectedRoom array
    if (selectedRoom === id) {
      setselectedRoom(selectedRoom !== id)
      return
    }
    // select Room
    setselectedRoom(id)
  }

  return { selectedRoom, handleSelect }
}
