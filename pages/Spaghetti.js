import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'


function Spaghetti(props) {
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")



  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select() 
      setBackgroundimageUrl(data[0].avatar_url)
      if (error) alert('you got an error here it is ,', error)
      
    }
    getData()
  }, [])

  return (
    <div>
      <Spaghettidiagram style={{width: "500"}}/>
      {backgroundimageUrl ? <img src={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} width={1000} alt="backgroundImage"/> : "No Background Image set"}
    </div>
  );
}

export default Spaghetti