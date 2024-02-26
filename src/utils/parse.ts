export const parseFormData = (data: object) => {
  const obj: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    if (value === 'undefined') continue
    if (typeof value === 'string') {
      obj[key] = JSON.parse(value)
    } else {
      obj[key] = value
    }
  }
  return obj
}

export const parse = (value: string | undefined) => {
  if (!value) return
  return value === 'undefined' ? undefined : JSON.parse(value)
}
