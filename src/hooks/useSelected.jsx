import { useState } from "react";

export default function useSelected() {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    // light already selected, remove it's id from selectedLights array
    if (selected.includes(id)) {
      setSelected(selected.filter((light) => light !== id));
      return;
    }
    // select light
    setSelected([...selected, id]);
  };

  return { selected, handleSelect };
}
