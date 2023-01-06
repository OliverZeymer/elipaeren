import { useState, useEffect } from "react"
import axios from "axios"
export default function useAxios(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    ;(async function () {
      try {
        const response = await axios.get(url)
        setData(response)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [url])
  const put = async (putUrl, body, headers) => {
    try {
      const response = await axios.put(putUrl, body, headers)
      setData(response.data)
    } catch (error) {
      setError(error)
    }
  }
  return { data, loading, error, put }
}
