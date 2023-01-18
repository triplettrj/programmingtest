import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'

function Spaghetti(props) {
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [datalogUrl, setDatalogUrl] = useState("")
  const [datalog, setDatalog] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select() 
      console.log('this is data', data)
      console.log('this is datalogUrl', data[0].datalogUrl) 
      setData(data)
    if (error) alert('you got an error here it is ,', error)
    }
    getData()
  }, [])

  return (
    <div>
      <Spaghettidiagram data={data} />
    </div>
  )
}

export default Spaghetti
