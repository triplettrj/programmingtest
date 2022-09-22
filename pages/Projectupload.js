import React, { useState } from 'react';
import {supabase} from '../database/Database'

function Projectupload() {
  const [image, setImage] = useState(null)
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    let backgroundimageUrl = ""

    try{
      if(image) {
        alert('image uploading?')
        const {data, error} = await supabase.storage.from("avatars").upload(`${Date.now()}_${image.name}`, image)
        if(error) throw error
        if(data) {
          setBackgroundimageUrl(data.Key)
          backgroundimageUrl = data.Key
          alert('upload sucessful')
        }
      }
    } catch(error){
      alert(error.message)
    } 
    
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <header>Add Project</header>
        {/* <div>        
          <span>Project Title</span>
          <input type="text" placeholder="Enter Project Title" />
        </div> */}
        <div>
          <span>Project Background Image</span>
          <input 
            type="file" 
            placeholder="Choose File" 
            accept={"image/jpeg image/png"} 
            onChange={event => setImage(event.target.files[0])}
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
          <input type="text" placeholder="Choose File" />
          <button>Browse</button>
          <button>+ Add another</button>
        </div>*/}
        <div> 
          <button type={"submit"} >Submit</button>
        </div>
    </form>

    {backgroundimageUrl ? <img src={`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${backgroundimageUrl}`} width={200} alt=""/> : "No Avatar set"}
    </>
)}

export default Projectupload