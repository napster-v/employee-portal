import React from "react";
import { NavBar } from "./NavBar";
import { useParams } from "react-router-dom";
import {
    faCircleCheck,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Toast from "./Toast";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

function EmployeeEdit(props) {
    library.add(faCircleCheck, faTriangleExclamation);

    const [employee, setEmployee] = React.useState({});
    const [department, setDepartment] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [currentStatus, setCurrentStatus] = React.useState(0);
    const [message, setMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("success");

    let params = useParams();

    const [isVisible, setIsVisible] = React.useState(false);
    const [isFormNotValid, setIsFormNotValid] = React.useState(false);

    const query = `
    query {employee(id: "${params.id}") {id firstName lastName age dateOfJoining title department employeeType currentStatus retiringIn}}`;

    function getDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    function getEmployee() {
        fetch("http://127.0.0.1:4000/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then((response) => response.json())
            .then((data) => {
                setEmployee(data.data.employee);
                setDepartment(data.data.employee.department);
                setTitle(data.data.employee.title);
                setCurrentStatus(data.data.employee.currentStatus);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdate(event) {
        event.preventDefault();
        let form = document.forms.updateEmployee;


        const query = `mutation UpdateEmployee($employee: EmployeeUpdate) {updateEmployee(employee: $employee) {id  firstName  lastName  age  dateOfJoining  title  department  employeeType  currentStatus}}`;
        let variables = {};
        variables.employee = {
            currentStatus: parseInt(currentStatus),
            department: department,
            title: title,
            employeeId: params.id,
        };

        if (
            employee.employeeType === "Seasonal" ||
            employee.employeeType === "Contract"
        ) {
            if (
                variables.employee.title === "Manager" ||
                variables.employee.title === "Director" ||
                variables.employee.title === "VP"
            ) {
                console.log("Invalid Title");
                setAlertType("warning");
                setIsVisible(true);
                setMessage(
                    "Seasonal and Contract employees cannot be Managers, Directors, or VPs."
                );
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);

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
                setAlertType("success");
                setMessage("Employee updated successfully!");
                console.log(data);
                setIsVisible(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    React.useEffect(() => {
        getEmployee(params.id);
    }, []);

    function handleErrorAlert() {
        setTimeout(() => {
        }, 1);
        if (isVisible === false) {
            setIsFormNotValid(true);
            setTimeout(() => {
                setIsFormNotValid(false);
            }, 3000);
        }
    }

    return (
        <div>
            <NavBar />
            <br />
            <div className={"container mx-auto px-3"}>
                <Card>
                    <Card.Header>Update Employee
                        <Card.Text>{employee && employee.retiringIn ? "Retires in " + employee.retiringIn :''}</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Form
                            autoComplete="off"
                            className={"w-full"}
                            name="addEmployee"
                            onSubmit={handleUpdate}
                        >
                            <Row>
                                <Col>
                                    <Form.Label>First Name*</Form.Label>
                                    <Form.Control placeholder="First name" name={"firstName"}
                                        defaultValue={employee.firstName} disabled
                                        type="text" />
                                </Col>
                                <Col>
                                    <Form.Label>Last Name*</Form.Label>
                                    <Form.Control placeholder="Last name" name={"lastName"}
                                        defaultValue={employee.lastName} disabled
                                        type="text" />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Label>Age*</Form.Label>
                                    <Form.Control name={"age"}
                                        defaultValue={employee.age} disabled
                                        type="number"
                                        placeholder="20-70" />
                                </Col>
                                <Col>
                                    <Form.Label>Date Of Joining*</Form.Label>
                                    <Form.Control name={"dateOfJoining"}
                                        defaultValue={getDate(new Date(parseInt(employee.dateOfJoining)))}
                                        disabled
                                        type="date"
                                        placeholder="Date Of Joining" />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Label>Employee Position*</Form.Label>
                                    <Form.Select name={"title"}  onChange={(e) => setTitle(e.target.value)}
                                        required defaultValue={employee.title}>
                                        {["Employee", "Manager", "Director", "VP"].map((title) => {
                                            return <option value={title} key={title}>{title}</option>
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Department Type*</Form.Label>
                                    <Form.Select name={"department"} defaultValue={employee.department}
                                        required  onChange={(e) => setDepartment(e.target.value)}>
                                        {["IT", "Marketing", "HR", "Engineer"].map((dept) => {
                                            return <option value={dept} key={dept}>{dept}</option>
                                        })}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Label>Employee Type*</Form.Label>
                                    <Form.Select name={"employeeType"}
                                        disabled defaultValue={employee.employeeType}>
                                        {["FullTime", "PartTime", "Contract", "Seasonal"].map((type) => {
                                            return <option value={type} key={type}>{type}</option>
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Employee Status*</Form.Label>
                                    <Form.Select onChange={(e) => setCurrentStatus(e.target.value)}
                                        name={"currentStatus"} required
                                        value={currentStatus}
                                    >
                                        {[
                                            { value: 0, label: "Retired" },
                                            { value: 1, label: "Working" },
                                        ].map((obj) => {
                                            return <option value={obj.value} key={obj.value}>{obj.label}</option>
                                        })}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Button variant="primary" type={"submit"}>Update Employee</Button>
                                </Col>

                            </Row>
                        </Form>
                        <Toast show={isVisible} message={message} type={alertType} icon={"fa-circle-check"} />
                        {/*<Toast
                    show={isFormNotValid}
                    type={"warning"}
                    icon={"fa-triangle-exclamation"}
                    message={message}
                />*/}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default EmployeeEdit;
