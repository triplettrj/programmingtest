import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'
import Loading from './components/loading'
import jwt_decode from 'jwt-decode'
import Layout from './components/layout'

function Spaghetti(props) {
  const [data, setData] = useState(null)
  const [userid, setUserid] = useState(null)
  const [projectTitle, setProjectTitle] = useState("")
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

  useEffect(() => {
    const tempid = jwt_decode(window.localStorage.getItem('supabase.auth.token')).sub
    setUserid(tempid)
  },[]) 

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select().eq('id', userid)
      setData(data)
      setProjectTitle(data[0].project_title)
    if (error) alert('you got an error here it is ,', error)
    }
    if(userid) getData()
  }, [userid])

  return (
    <>
    {isLoading ? (
      <Loading /> // Display the Loading component while loading
    ) : (
      <Layout>
          <Spaghettidiagram data={data} />
          <h2>{projectTitle.trim() !== "" ? projectTitle : "No project title set"}</h2>
      </Layout>
    )}
    </>
  )  
}

export default Spaghetti
