import React from 'react'
import Link from 'next/link'
import Loading from './components/loading'
import useCountdown from './components/useCountdown'
import Layout from './components/layout'

export default function Home() {
  const isCountdowning = useCountdown(true)

  return (

      <>
      {isCountdowning ? (
        <Loading /> // Display the Loading component while counting down
      ) : (
        <Layout>
          Click on a link and live your dreams
        </Layout>
      )}
    </>

    
  )
}
