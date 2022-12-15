import React from "react";
import { NavBar } from "./NavBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCircleCheck,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Toast from "./Toast";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
    library.add(faCircleCheck, faTriangleExclamation);

    const [isVisible, setIsVisible] = React.useState(false);
    const [isFormNotValid, setIsFormNotValid] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const query = `mutation AddEmployee($employee: EmployeeInput) {addEmployee(employee: $employee) {id firstName lastName age dateOfJoining title department employeeType currentStatus}}`;

    const navigate = useNavigate();

    function getDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    function handleSubmit(event) {
        setIsFormNotValid(false);
        event.preventDefault();
        let form = document.forms.addEmployee;
        let variables = {};
        variables.employee = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            age: parseInt(form.age.value),
            dateOfJoining: form.dateOfJoining.value,
            title: form.title.value,
            department: form.department.value,
            employeeType: form.employeeType.value,
        };
        if (
            variables.employee.employeeType === "Seasonal" ||
            variables.employee.employeeType === "Contract"
        ) {
            if (
                variables.employee.title === "Manager" ||
                variables.employee.title === "Director" ||
                variables.employee.title === "VP"
            ) {
                setIsFormNotValid(true);
                setMessage(
                    "Seasonal and Contract employees cannot be Managers, Directors, or VPs."
                );
                return;
            }
        }
        fetch("http://127.0.0.1:4000/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setMessage(data.errors[0].message);
                    setIsFormNotValid(true);
                    setTimeout(() => {
                        setIsFormNotValid(false);
                    }, 3000);
                } else {
                    setMessage("Employee has been added.");
                    setIsVisible(true);
                    setTimeout(() => {
                        setIsVisible(false);
                        navigate("/employees")
                    }, 3000);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <NavBar />
            <br />
            <div className={"container w-full mx-auto px-3"}>
                <Card>
                    <Card.Header>Add New Employee</Card.Header>
                    <Card.Body>
                        <Form name="addEmployee"
                            onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Label>First Name*</Form.Label>
                                    <Form.Control placeholder="First name" name={"firstName"}
                                        required
                                        type="text" />
                                </Col>
                                <Col>
                                    <Form.Label>Last Name*</Form.Label>
                                    <Form.Control placeholder="Last name" name={"lastName"}
                                        required
                                        type="text" />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Label>Age*</Form.Label>
                                    <Form.Control name={"age"}
                                        required
                                        type="number"
                                        min={20}
                                        max={70}
                                        placeholder="20-70" />
                                </Col>
                                <Col>
                                    <Form.Label>Date Of Joining*</Form.Label>
                                    <Form.Control name={"dateOfJoining"}
                                        required
                                        defaultValue={getDate()}
                                        type="date"
                                        placeholder="Date Of Joining" />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Label>Employee Position*</Form.Label>
                                    <Form.Select name={"title"}
                                        required >
                                        {["Employee", "Manager", "Director", "VP"].map((title) => {
                                            return <option key={title} value={title}>{title}</option>;
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Department Type*</Form.Label>
                                    <Form.Select name={"department"}
                                        required >
                                        {["IT", "Marketing", "HR", "Engineer"].map((title) => {
                                            return <option key={title} value={title}>{title}</option>;
                                        })}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Label>Employee Type*</Form.Label>
                                    <Form.Select name={"employeeType"}
                                        required >
                                        {["FullTime", "PartTime", "Contract", "Seasonal"].map((title) => {
                                            return <option key={title} value={title}>{title}</option>;
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Button variant="primary" type={"submit"}>Add Employee</Button>
                                </Col>

                            </Row>
                        </Form>
                        <Toast
                            show={isVisible}
                            type={"Success"}
                            icon={"fa-circle-check"}
                            message={message}
                        />
                        <Toast
                            show={isFormNotValid}
                            type={"Error"}
                            icon={"fa-triangle-exclamation"}
                            message={message}
                        />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};
export default EmployeeForm;
