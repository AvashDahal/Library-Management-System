import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
       
    },
    password: {
        type: String,
        required: true,
        trim: true,
       
    },
    confirmPassword: {
        type: String,
        required: false,
        trim: true,
       
    },

    location: {
        type: String, // String ma store
      },
      role: {
        type: String,
        enum: ["user","admin"],
        default:"user",
      },
      dateOfBirth:{
        type:Date,
        required:false,
      
      },
      phoneNo:{
        type:String,
        required:false,
      },
      emergencyContact:{
        type:String,
        required:false,
      },
      gender:{
        type:String,
        required:false,
        
      },
  
      user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
  
      
    },
  
    {
      timestamps: true,
    }
  );
  const User = mongoose.model("User",userSchema);
  export default User;