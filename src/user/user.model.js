import {mongoose} from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    courses:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"],
        default: 'STUDENT_ROLE'
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timesStamps: true
})

userSchema.methods.toJSON = function(){
    const { password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

export default mongoose.model("User", userSchema)