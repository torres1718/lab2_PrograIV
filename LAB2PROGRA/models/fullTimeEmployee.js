const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const fullTimeSchema=new Schema({
    name:String,
    lastName:String,
    AnnualSalary:Number,
    BenefitsCategory:String,
});

const FullTimeEmployee=mongoose.model('FullTimeEmployee',fullTimeSchema);
module.exports=FullTimeEmployee;