const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:String,
    email:String,
    password:String,
    phone:String
})

//creacion del modelo
const Employee=mongoose.model('Employee',employeeSchema);

module.exports=Employee;