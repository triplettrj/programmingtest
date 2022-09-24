import React, { useState } from 'react';
import {supabase} from '../database/Database'
import Image from 'next/image'

function Projectupload() {
  const [image, setImage] = useState(null)
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [projectTitle, setProjectTitle] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    let backgroundimageUrl = ""

      if(image) {
        const {data, error} = await supabase.storage.from("avatars").upload(`${Date.now()}_${image.name}`, image)
        if(error) alert(error.message)
        if(data) {
          setBackgroundimageUrl(data.Key)
          backgroundimageUrl = data.Key
          alert('upload sucessful')
        }
      }

      const {data, error} = await supabase.from("profiles").upsert({
        id: "83dc75ab-2160-478e-8db1-709f953e2d22",
        project_title: projectTitle,
        avatar_url: backgroundimageUrl
      })
      if(error) alert(error.message)
    }

    //
    
    //console.log('this is the local storage auth id, ', localStorage.getItem(supabase.auth.token))

    
  

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
            onChange={event => setImage(event.target.files[0])} //upload image here so you can get a preview
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

        <div>
          <span>Log File</span>
          <input type="text" placeholder="Choose File" /> //WHEN ADDING CVS FILE CONVERT TO ARRAY WITH description in word file
          <button>Browse</button>
          <button>+ Add another</button>
        </div>*/}
        <div> 
          <button type={"submit"} >Submit</button>
        </div>
    </form>
      <div>{projectTitle ? <h1>{projectTitle}</h1> : "No Project Title set"}</div>
      <picture>
          <source srcSet={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} type="image/webp" />
          <img src={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} alt="backgroundImage" />
      </picture>
    </>
)}

export default Projectupload