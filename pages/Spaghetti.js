import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'
import jwt_decode from 'jwt-decode'

function Spaghetti(props) {
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [datalogUrl, setDatalogUrl] = useState("")
  const [datalog, setDatalog] = useState([])
  const [data, setData] = useState(null)
  const [userid, setUserid] = useState(null)

  useEffect(() => {
    console.log(window.localStorage.getItem('supabase.auth.token'))
    const tempid = jwt_decode(window.localStorage.getItem('supabase.auth.token')).sub
    setUserid(tempid)
  },[]) 

  console.log('this is userid from the supabase.auth.token', userid) 

  useEffect(() => {
    if(userid){
      getData()
    }
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select().eq('id', userid)
      console.log('this is data', data)
      //console.log('this is datalogUrl', data[0].datalogUrl) 
      setData(data)
    if (error) alert('you got an error here it is ,', error)
    }
  }, [userid])

  return (
    <div>
      <Spaghettidiagram data={data} />
    </div>
  )
}

export default Spaghetti
