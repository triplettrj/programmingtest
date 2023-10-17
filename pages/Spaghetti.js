import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'
import jwt_decode from 'jwt-decode'

function Spaghetti(props) {
  const [data, setData] = useState(null)
  const [userid, setUserid] = useState(null)
  const [projectTitle, setProjectTitle] = useState("")

  function Loading() {
    return <div>Loading...</div>
  }

  useEffect(() => {
    const tempid = jwt_decode(window.localStorage.getItem('supabase.auth.token')).sub
    setUserid(tempid)
  },[]) 

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select().eq('id', userid)
      setData(data)
      setProjectTitle(data[0].project_title)
      console.log('this is data ', data)
    if (error) alert('you got an error here it is ,', error)
    }
    if(userid) getData()
  }, [userid])

  return (
    <>
      <div>
        <React.Suspense fallback={<Loading />}>
            <Spaghettidiagram data={data} />
        </React.Suspense>
        <h2>{projectTitle && projectTitle.trim() !== "" ? projectTitle : "No project title set"}</h2>
      </div>
    </>
    
  )
}

export default Spaghetti
