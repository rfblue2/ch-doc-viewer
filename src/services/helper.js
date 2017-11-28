export const handleResponse = res => {
  if (!res.ok) {
    return Promise.reject(res.statusText)
  }
  return res.json()
}