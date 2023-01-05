import { useState, useEffect } from "react"
import axios from "axios"
export default function useAxios(url, body, method) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (method === "put") axios.post(url, body)
    else
      axios
        .get(url)
        .then((res) => {
          setTimeout(() => {
            setData(res)
            setLoading(false)
          }, 700)
        })
        .catch((err) => {
          setError(err)
        })
  }, [url])
  return { data, loading, error }
}
