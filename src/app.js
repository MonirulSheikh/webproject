require('dotenv').config()

const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const bcyp=require('bcryptjs')
const path=require('path');
const table=require('./model/coll')
 require("./db/conn")
const router=require('./router/rout')
const hbs=require('hbs')
const {log}=require('console')

const cookieParser = require('cookie-parser')
const static_path=path.join(__dirname,'../public/css')
const view_path=path.join(__dirname,'../templates/views')

const partial_path=path.join(__dirname,'../templates/partials')
//const auth=require('./middleware/auth')
const port =process.env.Port
app.use(cookieParser())
hbs.registerPartials(partial_path);
app.use(express.static(static_path))
app.set('view engine', 'hbs');
app.set('views', view_path);
hbs.registerPartials(partial_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{

    res.render('index')
})

app.get('/sign_up',(req,res)=>{
    res.render('sign_up')
    
})
app.get('/login', (req,res)=>{
    res.render('login')
})


app.post('/sign_up', async (req,res)=>{

try{ 
 
    const pass=req.body.pass
    const cpass=req.body.cpass
   
if(pass===cpass){
const data=  new table({
    name:req.body.fname,
    email:req.body.email,
    phone:req.body.phone,
    password:pass,
    

    
});

const token=await data.createToken();
console.log("token",token)
//console.log(cookie('moni',token1,{expires:new Date (Date.now()+30000)}))
const result= await data.save()

res.cookie('jwtm',token)
//console.log('SIGN COOKISE'+req.cookies.jwtm)
res.render('login')
//res.cookie('jwebtoken',token,{expires:new Date (Date.now()+600000),httpOnly:true})
//res.cookie('moni',token1,{expires:new Date (Date.now()+30000)})
}else{
    res.send('password not match')
}


}catch(err){
res.status(404).send(err)
console.log(`poblem:${err}`)
}
})



app.post('/login' ,async (req,res)=>{
    try{
        res.json(req.body)
        const email=req.body.email1;
        const pass=req.body.pass1
        const  info=await table.findOne({email:email})
        const very_pass=await bcyp.compare(pass,info.password)
        
        const token=await info.createToken();
        

        if(very_pass){
            res.render('index')
            
            res.cookie('jwtm',token,{expires:new Date (Date.now()+600000),httpOnly:true})
            //console.log('LOGIN COOKISE'+req.cookies.jwtm)
        }else{
            console.log('login fail')
            res.send('login fail')
        }
       

    }catch(err){

        res.status(404).send('email invaild'+err)
        console.log(`fail due to ${err}`)
    }
})

app.get('/Secret',(req,res)=>{

 
    res.render('secret')
})
/*
app.get('/logout',async (req,res)=>{
    
    try {
          //res.clearCookie('jwtm');
          //single log out

       //single logout
        req.user.tokens=req.user.tokens.filter((currentEliment)=>{
return currentEliment.token  !=req.token
        })


//all device logout 
//req.user.tokens=[];
          res.clearCookie('jwtm');
          await req.user.save();
console.log("log out successful")

 res.render('login')

        
    } catch (error) {
        res.status(401).send(error)
    }


})
*/
app.listen(port)