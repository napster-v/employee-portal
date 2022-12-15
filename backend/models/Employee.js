import mongoose from "mongoose";
import moment from "moment";
import "moment-precise-range-plugin";

//calculate retirement date based on age and date of joining
function getRetirementDate(age, dateOfJoining) {
  let retirementDate = new Date(dateOfJoining);
  retirementDate.setFullYear(retirementDate.getFullYear() + (65 - age));
  return retirementDate;
}

const EmployeeModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dateOfJoining: Date,
  retirementDate: Date,
  title: String,
  department: String,
  employeeType: String,
  currentStatus: Number,
});

EmployeeModel.virtual("retiringIn").get(function () {
  let preciseDiff = moment.preciseDiff(
    moment(new Date()),
    moment(this.retirementDate),
    true
  );
  console.log("Precise Diff:", preciseDiff);
  return `${preciseDiff.days} days, ${preciseDiff.months} months, ${preciseDiff.years} years`;
});

EmployeeModel.pre("save", function (next) {
  this.retirementDate = getRetirementDate(this.age, this.dateOfJoining);
  next();
});

export const Employee = mongoose.model("Employee", EmployeeModel);
