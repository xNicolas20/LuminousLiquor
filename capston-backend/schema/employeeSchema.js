import mongoose from "mongoose"


const employeeSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    phone: { type: String, required: true},
    age: { type: Number, required: true},
    role: { type: String, required: true},
    totalHours: { type: Number, required: true},
    biWeeklyHours: { type: Number, required: true},
    rate: { type: Number, required: true}
})

export default mongoose.model("employees", employeeSchema);