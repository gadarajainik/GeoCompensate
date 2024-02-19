const mongoose = require("mongoose");
const { USER_TYPE, SEX } = require("../../utils/enums");
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
    employeeId: { type: String, require: true, unique: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    name: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: String,
    email: { type: String, require: true, unique: true },
    sex: { type: Schema.Types.String, enum: Object.keys(SEX), require: true },
    dob: { type: Date, require: true },
    address1: { type: Schema.Types.String, require: true },
    address2: { type: Schema.Types.String },
    city: { type: Schema.Types.String, require: true },
    state: { type: Schema.Types.String, require: true },
    zipcode: { type: Schema.Types.Number, require: true },
    phone: { type: Schema.Types.Number, require: true },
    ssn: { type: Schema.Types.Number, require: true },
    type: { type: Schema.Types.String, enum: Object.keys(USER_TYPE), require: true },
    hourlyPay: { type: Schema.Types.Number, require: true },
    password: { type: Schema.Types.String, require: true },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
});

module.exports = model("Employee", employeeSchema);