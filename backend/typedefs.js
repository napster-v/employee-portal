export const typeDefs = `
type Query {
    hello: String!
    cats: [Cat!]!
    employees(empType:String!, isRetiringSoon:Boolean!): [Employee!]!
    employee(id: String!): Employee
}

type Mutation {
    addCat(name: String!): Cat
    addEmployee(employee:EmployeeInput): Employee
    updateEmployee(employee:EmployeeUpdate): Employee
    deleteEmployee(id: String!):Employee

}

type Cat {
    id: ID!
    name: String!
}

type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int!
    retiringIn: String!
}

input EmployeeInput{
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
}

input EmployeeUpdate{
    title:String!
    department:String!
    currentStatus:Int!
    employeeId:String!
}
`;
