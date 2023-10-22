import React from 'react'
import Loading from './components/loading'
import useCountdown from './components/useCountdown'

export default function Home() {
  const isCountdowning = useCountdown(true)

  return (
    <>
      {isCountdowning ? (
        <Loading /> // Display the Loading component while counting down
      ) : (
        <>
          <div>yoooooo</div>
          <a href="Loginpage">Loginpage</a>
        </>
      )}
    </>
  )
}
