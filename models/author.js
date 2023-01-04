const mongoose=require("mongoose");
const schema= mongoose.Schema;

const author= new schema(
{
first_name: {type:String,required:true, maxLengrth:100},
last_name:{type:String,required:true,maxLength:100},
date_of_birth:{type:Date},
date_of_death:{type:Date},
}

);
author.virtual("name").get(function(){
    if(this.first_name){

        fullname= `${this.first_name}`;

    }
    if(this.last_name){
        fullname+=`${this.last_name}`
    }
    return fullname;
});
author.virtual("url").get(function(){
    return `/catalog/author/${this._id}`;
})

module.exports=mongoose.model('Author',author);