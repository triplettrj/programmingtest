import React, { useState, useEffect } from 'react'
import Loading from './components/loading'
//import useCountdown from './components/useCountdown'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate a loading time 
  useEffect(() => {
    // Simulate an asynchronous operation 
    setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Adjust the time as needed

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading /> // Display the Loading component while loading
      ) : (
        <>
          <div>yoooooo</div>
          <a href="Loginpage">Loginpage</a>
        </>
      )}
    </>
  )
}
