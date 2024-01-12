import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { supabase } from '../database/Database'
import styles from '../styles/login.module.css'
import Layout from './components/layout'

function Loginpage(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter() 
  
  const handleClickLogin = () => {
    setEmail('r22330407@gmail.com')
    setPassword('preparetobeamazed')
  }
  
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      document.getElementById("login-button").click();
    }
  }

  const login = async (email, password) => {
    try{
      const {data, error} = await supabase.auth.signIn({email, password})
      if(error) throw error
      alert('logged in through signIn')
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
    <Layout>
      <div className={styles.container }>
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
          type="password" 
          placeholder="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        /> 
      </div>
      {/*<div>
        <input type="checkbox" value="Remember Me" /> Remember Me 
        <a href="">Forget?</a>
      </div>*/}
      <button id="login-button" className={styles.loginBtn} onClick={() => login(email, password)}>LOGIN</button>
      <button className={styles.signUpBtn} onClick={() => signUp(email, password)}>SIGN UP</button>
      <div className={styles.note}>If you do not want to Sign Up then use the following credentials to LOGIN</div>

      <div className={styles.centerButtonsContainer}>
        <div className={styles.note}>username: r22330407@gmail.com</div>
        <div className={styles.note}>password: preparetobeamazed</div>
        <button className={styles.note} onClick={handleClickLogin}>fill login</button>
      </div>
    </div>
    </Layout>
)}

export default Loginpage