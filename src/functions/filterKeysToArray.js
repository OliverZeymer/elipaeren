export default function filterKeysToArray(data) {
  const results = []
  if (!data) return
  for (const key in data) {
    results.push({ ...data[key], id: key })
  }
  return results
}
