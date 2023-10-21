import { useState, useEffect } from 'react'

function useCountdown(initialLoadingState) {
  const [isLoading, setIsLoading] = useState(initialLoadingState)

  useEffect(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      setIsLoading(false)
    }, 5000); // Adjust the time as needed
  }, [])

  return isLoading
}

export default useCountdown
