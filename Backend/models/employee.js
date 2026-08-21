import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required:true,
    },
    phone: {
        type:Number,
        required:true,
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Department"
    }

});


const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;