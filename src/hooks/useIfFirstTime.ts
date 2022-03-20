import { useEffect, useState } from 'react'

export default function useIsFirstTime() {
  const [isFirstTime, setIsFirstTime] = useState(false)
  useEffect(() => {
    const isFirstTime = localStorage.getItem('first-time') == null
    setIsFirstTime(isFirstTime)
    if (isFirstTime) {
      localStorage.setItem('first-time', 'true')
    }
  }, [setIsFirstTime])
  return isFirstTime
}
