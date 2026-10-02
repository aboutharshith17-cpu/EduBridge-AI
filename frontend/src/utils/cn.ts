export function cn(...classes: (string | undefined | false | 0 | Record<string, boolean | undefined | null>)[]) {
  const result: string[] = []
  for (const cls of classes) {
    if (typeof cls === 'string') {
      result.push(cls)
    } else if (typeof cls === 'object' && cls !== null) {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result.push(key)
        }
      }
    }
  }
  return result.join(' ')
}
