import React, { useState, useEffect } from 'react'
import {supabase} from '../database/Database'
import Link from 'next/link'
import jwt_decode from 'jwt-decode'

function Projectupload() {
  const [image, setImage] = useState(null)
  const [datalog, setDatalog] = useState(null)
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [userid, setUserid] = useState(null)

  useEffect(() => {
    console.log(window.localStorage.getItem('supabase.auth.token'))
    const tempid = jwt_decode(window.localStorage.getItem('supabase.auth.token')).sub
    setUserid(tempid)
  },[]) 

  console.log('this is userid from the supabase.auth.token', userid) 

  const handleSubmit = async (e) => {
    e.preventDefault()

    let backgroundimageUrl = ""
    let datalogUrl = ""

      if(image) {
        const {data, error} = await supabase.storage.from("avatars").upload(`${Date.now()}_${image.name}`, image)
        if(error) alert(error.message)
        if(data) {
          setBackgroundimageUrl(data.Key)
          backgroundimageUrl = data.Key
          alert('Background Image upload sucessful')
        }
      }

      if(datalog) {
        const {data, error} = await supabase.storage.from("avatars").upload(`${Date.now()}_${datalog.name}`, datalog)
        if(error) alert(error.message)
        if(data) {
          datalogUrl = data.Key
          console.log('this is data on datalog from upload', data )
          alert('Datalog upload sucessful')
        }
      }

      const {data, error} = await supabase.from("profiles").upsert({
        id: userid, 
        project_title: projectTitle,
        avatar_url: backgroundimageUrl,
        datalogUrl: datalogUrl,
      })
      if(error) alert(error.message)
    }
    
    

  return (
    <>
      <form onSubmit={handleSubmit}>
        <header>Add Project</header>
        <div>        
          <span>Project Title</span>
          <input 
            type="text" 
            placeholder="Enter Project Title"
            onChange={event => setProjectTitle(event.target.value)}
            value={projectTitle}
            />
        </div>
        <div>
          <span>Project Background Image</span>
          <input 
            type="file" 
            placeholder="Choose File" 
            accept={"image/jpeg image/png"} 
            onChange={event => setImage(event.target.files[0])} 
          />
        </div>
        <div>
          <span>Log File</span>
          <input 
            type="file" 
            placeholder="Choose File" 
            accept=".csv" 
            onChange={event => setDatalog(event.target.files[0])}
          />
        </div>
        {/* <div>
          <span>Data Type</span>
          marvelmind<input type="radio" name="" id="" />
          wonderful<input type="radio" name="" id="" />
          fruits<input type="radio" name="" id="" />
          thanourselves<input type="radio" name="" id="" /> 
        </div>
        <div>        
          <span>Unit</span>
          <input type="number" placeholder="scale of map in m^2" />
        </div>
        */}
        <div> 
          <button type={"submit"}>Submit</button>
        </div>
    </form>

    <div>
        {backgroundimageUrl ? 
        <Link href="/Spaghetti">
          <a >You can now get Spaghetti so CLICK HERE and go there!</a> 
        </Link>
        : <h1>Submit project please!</h1>}
      </div>

      <div>
        {projectTitle ? <h1>{projectTitle}</h1> : "" }
      </div>
      
      <div>
        {backgroundimageUrl ? 
        <picture>
          <source srcSet={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} type="image/webp" />
          <img src={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} alt="backgroundImage" />
        </picture>
        : ""}
      </div>
      
      

      
    </>
)}

export default Projectupload