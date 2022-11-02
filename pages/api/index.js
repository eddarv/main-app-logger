// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let users=[{nickname:"", password:""}]

export default async function handler(req, res) {
  try{

    if(req.method==='POST') {

      // console.log(req.body)

      if(req.body.action==="Sign In"){
        let val = users.find((user)=> (user.nickname===req.body.nickname && user.password===req.body.password))
        // console.log(JSON.stringify(users) + " --- " + val)
        if(val===undefined) return res.status(500).json({nickname: "", validation:false, msj:"Bad credentials"})
        res.status(200).json({nickname: req.body.nickname, validation:true, msj:"Welcome!"})
      }

      if(req.body.action==="Sign Up"){
        let val = users.some((user)=>user.nickname===req.body.nickname)

        if(val===false) {
          users.push({nickname: req.body.nickname, password: req.body.password})
          // console.log("new  "+JSON.stringify(users))
          return res.status(200).json({nickname: req.body.nickname, validation:true, msj:"Thanks for register"})
        }

        if(val===true) {
          return res.status(200).json({nickname: "", validation:false, msj:"User already exists"})
        }
        
      }
    }
  }
  catch(e){
    console.log(e)
  }
}
