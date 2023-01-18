import { useRouter } from 'next/router'
import React, {useState} from 'react'
import {supabase} from '../database/Database'

function Loginpage(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter() 

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
      alert('you are signed up, please check your email and follow the verification link')
    } catch(error){
      alert(error.message)
    }
  }

  return (
    <div>
      <header>Login</header>
      <div>...........</div>
      <div>
        <input type="text" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)}/>         
      </div>
      <div>
        <input type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>         
      </div>
      <div>
        <input type="checkbox" value="Remember Me" /> Remember Me 
        <a href="">Forget?</a>
      </div>
      <button onClick={() => login(email, password)}>LOGIN</button>
      <button onClick={() => signUp(email, password)}>SIGN UP!</button>
    </div>
)}

export default Loginpage