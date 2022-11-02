let arr=[{nickname:"", posts:[]}]

export default async function handler(req, res) {
  try{
    // console.log("body "+ JSON.stringify(req.body))
    if(req.method==='POST') {

        if(req.body.post.content==='') {
            // console.log("GET")
            let i=0
            for( let index of arr.keys() ){
                if(arr[index].nickname===req.body.nickname){
                    i=index
                    break
                }  
            }
    
            if(i===0) return res.status(200).json([])
            return res.status(200).json(arr[i].posts)
        }


        // console.log("POST")
        let i=0

        arr=arr.map((el,index)=>{
            if(el.nickname!==req.body.nickname) return el
            i=index
            return {nickname:req.body.nickname, posts:[...el.posts, req.body.post]}
        })

        // console.log("arr " + JSON.stringify(arr))

        if(i===0){
            arr.push({nickname:req.body.nickname, posts:[req.body.post]})
            i=arr.length-1
        } 

        // console.log(i)
        return res.status(200).json(arr[i].posts)
        
    }
    

    if(req.method==='DELETE') {
        // console.log("DEL")
        
        let i=0
        arr=arr.map((el,index)=>{
            if(el.nickname!==req.body.nickname) return el
            i=index
            // console.log(i)
            let filteredPosts = el.posts.filter((el,index)=> index !== parseInt(req.body.id))
            // console.log(filteredPosts)
            return {nickname:req.body.nickname, posts:filteredPosts}
        })

        return res.status(200).json(arr[i].posts)
    }


    return res.status(500)
  }
  catch(e){
    console.log(e)
    return
  }
}