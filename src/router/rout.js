/*const exp=require('express');
const table=require('../model/coll')

const router= new exp.Router()
router.get('/about',(req,res)=>{
res.send(" about page");

})
router.get('/home',(req,res)=>{
    res.send(" home page");
    
    })
    router.get('/index',(req,res)=>{
        res.send("index page");
        
        })
        router.post('/login' ,async (req,res)=>{
            try{
                
                const email=req.body.email1;
                const pass=req.body.pass1
                const  info=await table.findOne({email:email})
                /*
                res.send(info.password)
                console.log(info.phone)
             
                if(pass===info.password){
                    res.render('/index')


                }else{
                    console.log(info.password)
                    res.send(info.pass)
                }
               

            }catch(err){

                res.status(404).send('email invaild')
            }
        })
        module.exports=router;
        */