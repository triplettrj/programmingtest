import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Loading from './components/loading'
import Layout from './components/layout'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate an asynchronous operation
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Adjust the time as needed

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading /> // Display the Loading component while loading
      ) : (
        <Layout>
          Click on a link and live your dreams
        </Layout>
      )}
    </>
  )
}
