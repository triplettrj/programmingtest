import React, { useState, useEffect } from 'react'
import { supabase } from '../database/Database'
import Link from 'next/link'
import jwt_decode from 'jwt-decode'
import styles from '../styles/form.module.css'

function Projectupload() {
  const [image, setImage] = useState(null)
  const [datalog, setDatalog] = useState(null)
  const [backgroundimageUrl, setBackgroundimageUrl] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [userid, setUserid] = useState(null)
  const [showBackgroundImagePreview, setShowBackgroundImagePreview] = useState(false)
  const [showLogFilePreview, setShowLogFilePreview] = useState(false)
  const [logFileContent, setLogFileContent] = useState("")
  const [isLoadingLogFile, setIsLoadingLogFile] = useState(false)
  const [isLoadingBackgroundImage, setIsLoadingBackgroundImage] = useState(false)


  const handleShowLogFilePreview = async () => {
    if (!showLogFilePreview) {
      setIsLoadingLogFile(true) // Set loading state when fetching data
      const logFileUrl =
        'https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1673426274689_2021_09_15__1352__marvelmind.csv'
      try {
        const response = await fetch(logFileUrl)
        const text = await response.text()
        const rows = text.split('\n').map((row) => row.split(' , '))
        setLogFileContent(rows)
      } catch (error) {
        console.error('Error loading log file:', error)
        setLogFileContent([]) // Set content to an empty array in case of an error
      }
  
      // Delay hiding the "Loading log file..." message for at least 3 seconds
      setTimeout(() => {
        setIsLoadingLogFile(false) // Set loading state to false after the delay
      }, 3000)
    }
    setShowLogFilePreview(!showLogFilePreview)
  }

  const handleShowBackgroundImagePreview = () => {
    if (!showBackgroundImagePreview) {
      setIsLoadingBackgroundImage(true) // Set loading state when fetching data
      // You can set the background image URL here
      const backgroundImageUrl =
        'https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1673426268457_lunchrum%20(2).png'
  
      const image = new Image()
      image.src = backgroundImageUrl
  
      image.onload = () => {
        setIsLoadingBackgroundImage(false) // Set loading state to false after the image has loaded
      }
  
      image.onerror = (error) => {
        console.error('Error loading background image:', error)
        setIsLoadingBackgroundImage(false) // Set loading state to false in case of an error
      }
    }
    setShowBackgroundImagePreview(!showBackgroundImagePreview)
  }
  

  useEffect(() => {
    const tempid = jwt_decode(window.localStorage.getItem('supabase.auth.token')).sub
    setUserid(tempid)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let backgroundimageUrl = ""
    let datalogUrl = ""

    if (image) {
      const { data, error } = await supabase.storage.from("avatars").upload(`${Date.now()}_${image.name}`, image)
      if (error) alert(error.message)
      if (data) {
        setBackgroundimageUrl(data.Key)
        backgroundimageUrl = data.Key
        alert('Background Image upload successful')
      }
    }

    if (datalog) {
      const { data, error } = await supabase.storage.from("avatars").upload(`${Date.now()}_${datalog.name}`, datalog)
      if (error) alert(error.message)
      if (data) {
        datalogUrl = data.Key
        alert('Datalog upload successful')
      }
    }

    const { data, error } = await supabase.from("profiles").upsert({
      id: userid,
      project_title: projectTitle,
      avatar_url: backgroundimageUrl,
      datalogUrl: datalogUrl
    })
    if (error) alert(error.message)
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
        <a href="#" onClick={handleShowBackgroundImagePreview}>
          {showBackgroundImagePreview ? 'Hide Background Image Preview' : 'Show Background Image Preview'}
        </a>
      </div>
      <div>
        <a href="#" onClick={handleShowLogFilePreview}>
          {showLogFilePreview ? 'Hide Log File Preview' : 'Show Log File Preview'}
        </a>
      </div>

      {showLogFilePreview && (
        <div>
          <h3>Log File Preview</h3>
          <p>(note: the 5th and 6th columns are the x and y coordinate tracked positions respectively)</p>
          {isLoadingLogFile ? (
            <p className={isLoadingLogFile ? `${styles.pulse}` : ""}>Loading log file...</p>
          ) : (
            <table>
              {logFileContent.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </table>
          )}
        </div>
      )}

      {showBackgroundImagePreview && (
        <div>
          <h3>Background Image Preview</h3>
          {isLoadingBackgroundImage ? (
            <p className={isLoadingBackgroundImage ? `${styles.pulse}` : ''}>Loading background image...</p>
          ) : (
            <img
              src="https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1673426268457_lunchrum%20(2).png"
              alt="Sample Background Image"
              width="600"
            />
          )}
        </div>
      )}


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
  )
}



export default Projectupload