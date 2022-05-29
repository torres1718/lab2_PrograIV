const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partTimeSchema = new Schema({
    name: String,
    lastName: String,
    HourlyRate: Number,
    MaxHoursPerWeek: Number,
});

const PartTimeEmployee = mongoose.model('PartTimeEmployee', partTimeSchema);
module.exports = PartTimeEmployee;
