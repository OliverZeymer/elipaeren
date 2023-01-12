import { useState } from "react";

export default function useSelectedLights() {
  const [selectedLights, setSelectedLights] = useState([]);

  const handleSelect = (id) => {
    // light already selected, remove it's id from selectedLights array
    if (selectedLights.includes(id)) {
      setSelectedLights(selectedLights.filter((light) => light !== id));
      return;
    }
    // select light
    setSelectedLights([...selectedLights, id]);
  };

  return { selectedLights, handleSelect };
}
