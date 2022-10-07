import React, { useEffect, useState } from 'react'
import {supabase} from '../database/Database'
import Spaghettidiagram from './components/spaghettidiagram'
const CSVToJSON = require("csvtojson")
const request = require('request')

export const getStaticProps = async () => {
  let datalogUrl = "https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/"  
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
    .fromStream(request.get('https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1664435228485_datalog.cvs?t=2022-10-03T07%3A12%3A59.501Z'))
    //console.log('this is jsonAry inside cvstojson, ', jsonAry)
  return {
    props : {data : jsonAry}
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
    console.log(backgroundimageX)
    
  }
  const inlinestyle =  {
    position: "relative",
    left: `${backgroundimageX}px`,
    top: `${backgroundimageY}px`,
    zindex: -1,

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
      <picture>
        <source  
          srcSet={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} 
          type="image/webp" 
        />
        <img 
          src={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} 
          alt="backgroundImage"
          onClick={handleBackgroundimageClick} 
        ></img>
        
        

      </picture>
      : "No Background Image set"}
      {backgroundimageX ? 
      <div>o</div>
      : null}
      
      <div className="container">
        <div className="pictureouside" onClick={handleBackgroundimageClick}> 
          <div style={inlinestyle}>
            o

          </div>
        </div>
      </div>

    </div>
  );
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