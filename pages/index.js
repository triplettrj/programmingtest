import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Loading from './components/loading'
import Layout from './components/layout'

const LOADING_TIME = 5000

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate an asynchronous operation
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, LOADING_TIME) 
    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Layout>
          Click on a link and live your dreams
        </Layout>
      )}
    </>
  )
}
