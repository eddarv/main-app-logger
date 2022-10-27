import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import ReactDOM from "react-dom"


const initialForm={title:"",content:""}

const Posts = ({nickname, children}) => {
    const [postsList, setPostsLists] = useState([]);
    const [showWindow, setShowWindow] = useState(false);
    const [isReady, setIsReady] = useState("");
    const [form, setForm] = useState(initialForm);
    const [id, setId] = useState({id:-1, change:true});


    let optionsPost={
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nickname,post:form})
    }
    let optionsDelete={
        method:'DELETE',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nickname,id:id.id})
    }

    let customFetch = async (opt) => {
        try{
          let list = await fetch("http://localhost:3000/api/posts",opt)
          let json= await list.json()
          console.log(json)

          setPostsLists(json)
        }
        catch(e) {
          console.log(e)
        }
        
    }

    const handleClose = (e) => {
        e.preventDefault()
        setId({id:e.target.id, change: !id.change})
    }

    const handleClose2 = (e) => {
        e.preventDefault()
        setShowWindow(false)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    useEffect(()=>{
        if(form.title.length===0||form.content.length===0) return setIsReady("disabled")
        setIsReady("")
    },[form])

    useEffect(()=>{
        if(id.id===-1) return
        customFetch(optionsDelete)
    },[id])

    const createNewPost = (e) => {
        e.preventDefault()
        setShowWindow(false)
        if(!form.title||!form.content) return
        customFetch(optionsPost)
        setForm(initialForm)
    }
    

    useEffect(()=>{
        customFetch(optionsPost)
        
    },[])

    return (  
        <div className={styles.container}>
            <h2>Todo List</h2>
            <section className={styles.list}>
                {(  
                    postsList.length>0

                    ?
                    postsList.map((el,i)=>{
                        return(
                            <article key={i} className={styles.post}>
                                <div className={styles.post_section}>
                                    <div className={styles.post_t}>
                                        <p className={styles.post_t2}>{postsList[i].title}</p>
                                    </div>
                                    <div className={styles.post_p}>
                                        <p className={styles.post_p2}>{postsList[i].content}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={handleClose} id={i} className={styles.button3}>x</button>
                                </div> 
                            </article>
                        )
                    })

                    :
                    <h3>There are no posts yet, create one...</h3>
                )}

            </section>
            <button onClick={()=>setShowWindow(true)} className={styles.button2}>+</button>
           
            <section className={showWindow ? styles.background3 : styles.hide}>
                <form onSubmit={createNewPost} className={styles.form2}>
                    <button onClick={handleClose2} className={styles.button3}>x</button>
                    <input type="text" placeholder="New Todo" onChange={handleChange} name="title" value={form.title} className={styles.text2}/>
                    <textarea placeholder="What are you thinking?" onChange={handleChange} name="content" value={form.content} required className={styles.text3}></textarea>
                    <input type="submit" className={isReady} required className={styles.button}/>
                </form>
            </section>
                   
        </div>
    )
}
 
export default Posts