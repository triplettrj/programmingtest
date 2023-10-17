import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'
import jwt_decode from 'jwt-decode'

function Spaghetti(props) {
  const [data, setData] = useState(null)
  const [userid, setUserid] = useState(null)

  useEffect(() => {
    const tempid = jwt_decode(window.localStorage.getItem('supabase.auth.token')).sub
    setUserid(tempid)
  },[]) 

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select().eq('id', userid)
      setData(data)
    if (error) alert('you got an error here it is ,', error)
    }
    if(userid) getData()
  }, [userid])

  return (
    <>
    <div>
      <Spaghettidiagram data={data} />
    </div>
    </>
    
  )
}

export default Spaghetti
