import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const Employee = (props) => {
    library.add(faPenToSquare, faTrash);
    const query =
        "mutation DeleteEmployee($deleteEmployeeId: String!) {deleteEmployee(id: $deleteEmployeeId) {id  firstName  lastName  age  dateOfJoining  title  department  employeeType  currentStatus}}";

    let variables = {};
    variables.deleteEmployeeId = props.data.id;

    function deleteEmployee() {
        fetch("http://127.0.0.1:4000/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables }),
        })
            .then((response) => response.json())
            .then((data, errors) => {
                if (data.errors) {
                    props.handleDelete({
                        status: true,
                        error: data.errors[0].message
                    });
                    setTimeout(() => {
                        props.handleDelete({
                            status: false
                        });
                    }, 3000);
                } else {
                    props.handleDelete({
                        status: true,
                        success: true
                    });
                    setTimeout(() => {
                        props.handleDelete({
                            status: false
                        });
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <tr>
            <td>{props.data.firstName}</td>
            <td>{props.data.lastName}</td>
            <td>{props.data.age}</td>
            <td>{new Date(parseInt(props.data.dateOfJoining)).toDateString()}</td>
            <td>{props.data.title}</td>
            <td>{props.data.department}</td>
            <td>{props.data.employeeType}</td>
            <td>{props.data.currentStatus}</td>
            <td className={"space-x-4"}>
                <Link className={"btn btn-xs btn-circle"} to={`${props.data.id}`}>
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                </Link>

                <Link
                    onClick={deleteEmployee}
                    className={"btn btn-xs btn-circle"}
                    to={""}
                >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                </Link>
            </td>
        </tr>
    );
};
