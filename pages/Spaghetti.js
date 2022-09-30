import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'


function Spaghetti(props) {
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [datalogUrl, setDatalogUrl] = useState("")
  const [datalog, setDatalog] = useState(null)
  

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select() 
      setBackgroundimageUrl(data[0].avatar_url)
      setDatalogUrl(data[0].datalogUrl)
      //console.log('this is datalogurl.split ', datalogUrl.split('/')[1])
      if (error) alert('you got an error here it is ,', error)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.storage
      .from('avatars')
      .download('1664435228485_datalog.cvs')      //cant get .download(datalogUrl.split('/')[1]) to work.....
      data.text().then(text => setDatalog(text))
      //console.log('this is the datalog, ', datalog)
      if (error) console.log('error on getting datalog, ', error)
    }
    getData()
  }, [datalogUrl])

  return (
    <div>
      <Spaghettidiagram datalog={datalog}/>
      {backgroundimageUrl ? 
      <picture>
        <source srcSet={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} type="image/webp" />
        <img src={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} alt="backgroundImage" />
      </picture>
      : "No Background Image set"}
    </div>
  );
}

export default Spaghetti