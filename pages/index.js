import Head from 'next/head'
import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Posts from '../components/Posts';
import { ReactDOM } from "react";
import LogoutButton from '../components/LogoutButton';
import styles from '../styles/Home.module.css'

let initialForm = {
  nickname:"",
  password:"",
  action:""
}

let initialValidation = {
  validation:false,
  nickname:"",
  msj:""
}


export default function Home() {

  const [form, setForm] = useState(initialForm);
  const [send, setSend] = useState(false);
  const [validation,setValidation] = useState(initialValidation)
  const [showPosts,setShowPosts] = useState(false)


  const handleChange = (e) =>{
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
  }



  let options={
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(form)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    if(!form.nickname|| form.password.length<8 || form.password.length>50 || form.nickname.length>20){
        return
    }

    console.log(e.target.value)

    setForm({
      ...form,
      action:e.target.value
    })

    setSend(true)
  }

  useEffect(()=>{

    if(send===true){
      customFetch()
      setSend(false)
      setForm(initialForm)
    }
      
  },[send])

  useEffect(()=>{

    if (validation.msj==="Thanks for register"||validation.msj==="Welcome!"){
      setTimeout(()=>setShowPosts(true),5000)
    }

    if (validation.msj==="Bad credentials"||validation.msj==="User already exists"){
      setShowPosts(true)
      setTimeout(()=>setShowPosts(false),5000)
    }

    
  },[validation])


  let customFetch = async () => {
    try{
      let val = await fetch("https://main-app-logger-git-main-eddarv.vercel.app/api",options)
      let json= await val.json()
      console.log("si", json)
      setValidation({
        validation: json.validation,
        nickname: json.nickname,
        msj: json.msj
      })
    }
    catch(e) {
      console.log(e)
      setValidation({
        validation: false,
        nickname: ""
      })

    }
    
  }

  


  return (
    <div className={showPosts===true && validation.validation===true ? "" : styles.background} >
      <Head>
        <title>Main APP</title>
        <meta name="description" content="Main tasks APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={showPosts===true && validation.validation===true ? styles.main2 : styles.main} id="main">
        <header id="header" className={showPosts===true && validation.validation===true ? styles.header : ""}>
          <h1 className={showPosts===true && validation.validation===true ? styles.main_title2 : styles.main_title}>Main APP</h1>
        </header>
        {(
          validation.validation===false
          ?
            showPosts===false
            ?
              <Form handleChange={handleChange} form={form} handleSubmit={handleSubmit}/>
            :
              <h2>
                {validation.msj}
              </h2>
          :
              showPosts===false
            ?

              <h2>
                {validation.msj}
              </h2>

            :
              <>
              <LogoutButton setValidation={setValidation} setShowPosts={setShowPosts} initialValidation={initialValidation}/>
              <Posts nickname={validation.nickname}/>
              </>

        )}
        
        
      </div>

      
    </div>
  )
}
