import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'
const CSVToJSON = require("csvtojson")
const request = require('request')

export const getStaticProps = async () => {
  let datalogUrl = "https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/datalog.cvs?t=2022-11-04T09%3A49%3A47.092Z"  
  const getData = async () => {
    let { data, error } = await supabase.from('profiles').select() 
    datalogUrl = datalogUrl + data[0].datalogUrl
    console.log('this is datalogurl ', datalogUrl)
    if (error) alert('you got an error here it is ,', error)
  }
  getData()
  console.log('this is datalogurl ', datalogUrl)

  const jsonAry = await CSVToJSON()
    //.fromStream(request.get(datalogUrl))
    .fromStream(request.get('https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/datalog.cvs?t=2022-11-04T09%3A49%3A47.092Z'))
  return {
    props : {data : jsonAry || [], fallback: false }
  }
}

function Spaghetti(props) {
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [datalogUrl, setDatalogUrl] = useState("")
  const [datalog, setDatalog] = useState(props.data)
  const [backgroundimageX, setBackgroundimageX] = useState(null)
  const [backgroundimageY, setBackgroundimageY] = useState(null)

  const handleBackgroundimageClick = (e) => {
    setBackgroundimageX(e.nativeEvent.offsetX)
    setBackgroundimageY(e.nativeEvent.offsetY)
  }

  const inlinestyle = {
    position: "relative",
    left: `${backgroundimageX}px`,
    top: `${backgroundimageY}px`,
    zindex: -1,
  }

  const picturestyle = {
    width: '500px',
    height: '500px',
    backgroundimageUrl: 'https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/Programming_Test_layout.png',
  }


  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('profiles').select() 
      setBackgroundimageUrl(data[0].avatar_url)
      //setDatalogUrl(data[0].datalogUrl)
      //console.log('this is datalogurl ', datalogUrl)
      if (error) alert('you got an error here it is ,', error)
    }
    getData()
  }, [])

  return (
    <div>
      <Spaghettidiagram datalog={datalog}/>

      {backgroundimageUrl ? 
      <div className="container">
      <picture>
        <source  
          srcSet={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} 
          type="image/webp" 
        />
        <img 
          src={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} 
          alt="backgroundImage"
          onClick={handleBackgroundimageClick} 
        />
      </picture>
      </div>
      : "No Background Image set"}

      <div className="container">
        <div className="pictureouside" onClick={handleBackgroundimageClick}> 
          <div style={inlinestyle}>
            o   
          <input type="text" placeholder='Title' />
          <input type="text" placeholder='Duration' />
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Spaghetti

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data, error } = await supabase.storage
  //     .from('avatars')
  //     .download('1664435228485_datalog.cvs')      //cant get .download(datalogUrl.split('/')[1]) to work.....
  //     //data.text().then(text => setDatalog(text))
  //     //console.log(data)

  //     //console.log('this is the datalog, ', datalog)
  //     if (error) console.log('error on getting datalog, ', error)
  //   }
  //   getData()
  // }, [datalogUrl])