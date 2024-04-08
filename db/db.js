const mongoose=require( 'mongoose');
const zod=require("zod")
require( "dotenv").config();
DATABASE_URL=process.env.DATABASE_URL;
const URL=mongoose.connect("mongodb+srv://sarvesh1710:bzPYBEAAUBg64pdR@cluster0.ezhtvfa.mongodb.net/")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        validate:(v)=>zod.string().min(3).max(15).parse(v)
    },
    email:{
        type:String,
        unique:true,
        lowercase: true,
        trim: true, 
        required: [true,"Please provide an email"],
        validate: (value) => {
            if (!zod.string().email().parse(value)) {
              console.log('Invalid Email')
            }
          }
    },
    password:{
        type: String,
        required: [true,'A user must have a password'],
        minlength:5,
        select:false //hides this field when we query the database
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        onUpdateOf: "createdAt"
    }
})


const User=mongoose.model("User",UserSchema)

module.exports={
    User
}
