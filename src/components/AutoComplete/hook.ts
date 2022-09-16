import { useState, useEffect } from 'react'

function useDebounce (value: any, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}

function useClickOutside (targetRef: any, callback: Function) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!targetRef.current || targetRef.current.contains(e.target)) return

      callback()
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [targetRef, callback])
}

export { useDebounce, useClickOutside }
