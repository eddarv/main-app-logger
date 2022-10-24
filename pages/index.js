import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'



let initialForm = {
  nickname:"",
  password:"",
}


export default function Home() {

  const [form, setForm] = useState(initialForm);


  const handleChange = (e) =>{
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    if(!form.nickname||form.password.length<8){
        return
    }
  }

  let options={
    body:{nickname: form.nickname, password: form.password},
          headers:{"Content-Type":"application/json"},
          withCredentials: true,
          credentials: 'include'
  }
  


  return (
    <div className={styles.container}>
      <Head>
        <title>Main APP</title>
        <meta name="description" content="Main tasks APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={""} onSubmit={handleSubmit} autoComplete="off">
        <form className="main-bubble-form" onSubmit={handleSubmit} autoComplete="off">
            <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} value={form.nickname}/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={form.password}/>
            <input className={`button ${ (!form.nickname||!form.password) ? "disabled" : ""}`} type="submit" value="Sign Up"/>
            <input className={`button ${ (!form.nickname||!form.password) ? "disabled" : ""}`} type="submit" value="Sign In"/>
        </form>
      </main>

      
    </div>
  )
}
