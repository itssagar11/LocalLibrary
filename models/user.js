const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bcrypt= require("bcrypt");
const SOLT_WORK_FACTOR=8;


const userSchema=new Schema({
    first_name:{type:String, required:true},
    last_name:{type:String,required:true},
    username:{type:String,required:true,index:{unique:true}},
    email:{type:String,required:true},
    password:{type:String,required:true,minlength:6}

});
userSchema.virtual('name').get(function(nex){
    return this.first_name+" "+this.last_name;
});


userSchema.pre('save',function(next){
    bcrypt.genSalt(SOLT_WORK_FACTOR,(err,salt)=>{ // genreate salt
                if(err) return next(err);

                bcrypt.hash(this.password,salt,(err,hash)=>{
                    if(err) return next(err);
                    this.password=hash;
                    next();
                })
    })
});


userSchema.methods.hashPassword= function(inputpass){
   return  bcrypt.compare(inputpass,this.password);
}

module.exports= mongoose.model("user",userSchema);