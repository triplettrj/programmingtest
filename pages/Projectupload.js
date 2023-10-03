import React, { useState, useEffect } from 'react'
import {supabase} from '../database/Database'
import Link from 'next/link'
import jwt_decode from 'jwt-decode'
import styles from '../styles/form.module.css'

function Projectupload() {
  const [image, setImage] = useState(null)
  const [datalog, setDatalog] = useState(null)
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [userid, setUserid] = useState(null)

  useEffect(() => {
    const tempid = jwt_decode(window.localStorage.getItem('supabase.auth.token')).sub
    setUserid(tempid)
  },[]) 

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
          alert('Background Image upload successful')
        }
      }

      if(datalog) {
        const {data, error} = await supabase.storage.from("avatars").upload(`${Date.now()}_${datalog.name}`, datalog)
        if(error) alert(error.message)
        if(data) {
          datalogUrl = data.Key
          alert('Datalog upload successful')
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
      <form onSubmit={handleSubmit} className={styles.container}>
        <header className={styles.header}>Add Project</header>
        <div className={styles.inputWrapper}>
          <span>Project Title</span>
          <input
            type="text"
            placeholder="Enter Project Title"
            onChange={(event) => setProjectTitle(event.target.value)}
            value={projectTitle}
          />
        </div>
        <div className={styles.inputWrapper}>
          <span>Background Image</span>
          <input
            type="file"
            placeholder="Choose File"
            accept={"image/jpeg image/png"}
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <div className={styles.inputWrapper}>
          <span>Log File</span>
          <input
            type="file"
            placeholder="Choose File"
            accept=".csv"
            onChange={(event) => setDatalog(event.target.files[0])}
          />
        </div>
        <div>
          <button type={"submit"} className={styles.loginBtn}>
            Submit
          </button>
        </div>
      </form>
      
      <div className={styles.note}>
        <div>
          <a href="https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1673426268457_lunchrum%20(2).png">
            Download sample Background Image here.....
          </a>
        </div>
        <div>
          <a href="https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1673426274689_2021_09_15__1352__marvelmind.csv">
            and here is a Log File for this Background Image
          </a>
        </div>
      </div>

      <div>
        {backgroundimageUrl ? (
          <Link href="/Spaghetti">
            <a>You can now get Spaghetti so CLICK HERE and go there!</a>
          </Link>
        ) : (
          <p>Submit project please!</p>
        )}
        <Link href="/Spaghetti">
          <a>or go straight to spaghetti</a>
        </Link>
      </div>
      <div>
        {projectTitle ? <h1>{projectTitle}</h1> : ""}
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