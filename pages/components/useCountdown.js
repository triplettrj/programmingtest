import { useState, useEffect } from 'react'

function useCountdown(initialCountdownState) {
  const [isCountdowning, setIsCountdowning] = useState(initialCountdownState)

  useEffect(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      setIsCountdowning(false)
    }, 5000) // Adjust the time as needed
  }, [])

  return isCountdowning
}

export default useCountdown
