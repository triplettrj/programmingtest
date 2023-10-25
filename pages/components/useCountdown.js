import { useState, useEffect } from 'react'

function useCountdown(initialCountdownState) {
  const [isCountdowning, setIsCountdowning] = useState(initialCountdownState)

  useEffect(() => {
    console.log("Countdown started")
    try {
      setTimeout(() => {
        console.log("Countdown finished")
        setIsCountdowning(false)
      }, 5000)
    } catch (error) {
      console.error("Countdown error:", error)
    }
  }, [])

  return isCountdowning
}

export default useCountdown
