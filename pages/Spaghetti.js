import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'
import Image from 'next/image'


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
      <Spaghettidiagram />
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