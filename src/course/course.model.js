import { Schema, model } from "mongoose";


const courseSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength:[50, "Name cannot exceed 50 characters"]
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    versionKey: false,
    timesStamps: true
})

courseSchema.methods.toJSON = function(){
    const {name, _id, description} = this.toObject()
        this.uid = _id
        return { name, _id: this.uid, description };
}

export default model("Course", courseSchema)