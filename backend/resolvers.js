import { Cat } from "./models/Cat.js";
import { Employee } from "./models/Employee.js";
import { GraphQLError } from "graphql";

async function getAllCats() {
  // throw new GraphQLError("Error in getAllCats");
  return Cat.find({});
}

async function getAllEmployees(empType, isRetiringSoon) {
  console.log("EmpType:", empType);
  console.log("isRetiringSoon:", isRetiringSoon);
  let query = {};
  if (empType !== "All") {
    query.employeeType = empType;
  }

  if (isRetiringSoon) {
    let today = new Date();

    let dateAfterSixMonths = new Date();
    dateAfterSixMonths.setMonth(dateAfterSixMonths.getMonth() + 6);
    query.retirementDate = {
      $gte: today,
      $lte: dateAfterSixMonths,
    };
  }
  return Employee.find(query).sort({ firstName: 1 });
}

async function getEmployee(_, { id }) {
  return Employee.findById(id);
}

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    cats: getAllCats,
    employees: (_, { empType, isRetiringSoon }) =>
      getAllEmployees(empType, isRetiringSoon),
    employee: getEmployee,
  },
  Mutation: {
    addCat,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  },
};

async function deleteEmployee(_, { id }) {
  console.log("Employee Id:", id);
  let employee = await Employee.findById(id);
  console.log("Employee:", employee);
  if (employee.currentStatus === 1) {
    throw new GraphQLError("Can't delete employee - status is active.");
  }
  return Employee.findByIdAndDelete(id);
}

async function updateEmployee(_, { employee }) {
  console.log("Employee:", employee);
  return Employee.findByIdAndUpdate(employee.employeeId, employee, {
    new: true,
  });
}

async function addEmployee(_, { employee }) {
  console.log("Employee:", employee);
  employee.currentStatus = 1;
  return new Employee(employee).save();
}

async function addCat(_, { name }) {
  console.log("Cat name:", name);
  return new Cat({ name }).save();
}
