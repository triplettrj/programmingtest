import { useRouter } from 'next/router'
import React, {useState} from 'react'
import {supabase} from '../database/Database'
import styles from '../styles/login.module.css'

function Loginpage(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter() 
  
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      // code to click the login button
      document.getElementById("login-button").click();
    }
  }

  const login = async (email, password) => {
    try{
      const {data, error} = await supabase.auth.signIn({email, password})
      if(error) throw error
      alert('logged in through signIn')
      console.log('this is the data on login', data.user)
      router.push('/Projectupload')
    } catch(error){
      alert(error.message)
    } 
  }

  const signUp = async (email, password) => {
    try{
      const {error} = await supabase.auth.signUp({email, password})
      if(error) throw error
      alert('you are signed up, please check your email and follow the verification link and then you will be able to log in!')
    } catch(error){
      alert(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>Login</header>
      <div className={styles.inputWrapper}>
        <input 
          type="text" 
          placeholder="username" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />         
      </div>
      <div className={styles.inputWrapper}>
        <input 
          type="text" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />         
      </div>
      {/*<div>
        <input type="checkbox" value="Remember Me" /> Remember Me 
        <a href="">Forget?</a>
      </div>*/ }
      <button id="login-button" className={styles.loginBtn} onClick={() => login(email, password)}>LOGIN</button>
      <button className={styles.signUpBtn} onClick={() => signUp(email, password)}>SIGN UP!</button>
      <div className={styles.note}>If you dont want to signUp then use</div>
      <div className={styles.note}>username: r22330407@gmail.com</div>
      <div className={styles.note}>password: preparetobeamazed</div>
    </div>
    
)}

export default Loginpage