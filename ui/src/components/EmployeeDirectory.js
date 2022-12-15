import { EmployeeTable } from "./EmployeeTable";
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Toast from "./Toast";

export const EmployeeDirectory = () => {
  library.add(faTriangleExclamation);
  const query = `query Employees($empType: String!,$isRetiringSoon: Boolean!) {employees(empType: $empType, isRetiringSoon: $isRetiringSoon) {id firstName lastName age dateOfJoining title department employeeType currentStatus}}`;
  const [emp, setEmp] = useState([]);
  const [filterParam, setFilterParam] = useState("All");
  const [isDeleted, setIsDeleted] = useState(false);
  const [message, setMessage] = useState({});
  const [retiringSoon, setRetiringSoon] = useState(false);

  const fetchEmployees = () => {
    let variables = {};
    variables.empType = filterParam;
    variables.isRetiringSoon = retiringSoon;
    fetch("http://127.0.0.1:4000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmp(data.data.employees);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, [filterParam, retiringSoon]);

  function handleDelete(value) {
    if (!value.status) {
      setIsDeleted(false);
    } else if (value.status && value["success"]) {
      setIsDeleted(true);
      setMessage({ type: "Success!", msg: "Empolyee Deleted Successfully!" })
      fetchEmployees();
    } else if (value.status && value["error"]) {
      setMessage({ type: "Error!", msg: value.error })
      setIsDeleted(true);
    }
  }

  return (
    <div>
      <NavBar />
      <br />
      <EmployeeTable
        handleDelete={handleDelete}
        filterParam={setFilterParam}
        isRetiringSoon={setRetiringSoon}
        data={emp}
      />
      <Toast
        show={isDeleted}
        type={message.type}
        message={message.msg}
        icon={"fa-triangle-exclamation"}
      />
    </div>
  );
};
