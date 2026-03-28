export function get(key) {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch {
    return null
  }
}

export function set(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable
  }
}

export function remove(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
