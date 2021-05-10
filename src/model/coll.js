require('dotenv').config()

const mongoo=require('mongoose');
const validator=require('validator');
const bcry=require('bcryptjs');
const jwt=require('jsonwebtoken');
const studentSchema= new mongoo.Schema({
name:{
    type:String,
    uppercase:true,
    require:true,
unique:true

} ,
email:{
    type:String,
   
    require:true,

},
phone:{
    type:Number,
    min:10,
    require:true
},
password:{
    type:String,
    require:true
},
Conform_password:{
    type:String,
    require:true
}, 
tokens:[{token:
    {
    type:String,
    require:true
}
}]


})

studentSchema.methods.createToken= async function(){
try {
    
    const token= await jwt.sign({_id:this._id.toString()},process.env.SECRET);
    this.tokens= this.tokens.concat({token:token})
    await this.save()
return token
   
    
} catch (error) {
    
    console.log(`myerr is:_${error}`)
}
}
studentSchema.pre('save' ,async function (next){
    if(this.isModified('password')){
       
        this.password= await  bcry.hash(this.password,10)



    }
next();

})


//creatr collection
const StudentCollection= mongoo.model('student_record',studentSchema);
module.exports=StudentCollection;
