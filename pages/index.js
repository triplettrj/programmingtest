import React, { useState, useEffect } from 'react'
import Loading from './components/loading'
import useCountdown from './components/useCountdown'

export default function Home() {
  const isLoading = useCountdown(true)

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
  );
}