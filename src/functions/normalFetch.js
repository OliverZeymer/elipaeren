// Methods supported [PATCH, DELETE, POST, GET]

export default async function normalFetch({ url, method, headers, body }) {
  if (!url) return
  try {
    const res = await fetch(url, {
      method: method ? method : "GET",
      headers: headers ? headers : { "Content-Type": "application/json" },
      body: body || null,
    })

    // stauts code handling
    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.status)
    }

    const json = await res.json()

    // return data
    return json
  } catch (err) {
    // error handling
    console.error(err)
    return err
  }
}
