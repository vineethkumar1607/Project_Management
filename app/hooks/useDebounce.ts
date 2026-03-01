import { useEffect, useState } from "react"

/*
 reusable debounce hook

 prevents excessive API calls

 returns debounced value
*/
export function useDebounce<T>(
  value: T,
  delay = 500
): T {

  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)

  }, [value, delay])

  return debouncedValue
}