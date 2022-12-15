import { Employee } from "./Employee";
import React from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const EmployeeTable = ({
    handleDelete,
    filterParam,
    data,
    isRetiringSoon,
}) => {
    return (
        <div className={"container mx-auto"}>
            <Row>
                <Col>
                    <Form.Label>Select to Filter</Form.Label>
                    <Form.Select onChange={(e) => {
                        filterParam(e.target.value);
                    }}>
                        <option value={"All"}>All</option>
                        <option value={"PartTime"}>PartTime</option>
                        <option value={"Contract"}>Contract</option>
                        <option value={"FullTime"}>FullTime</option>
                        <option value={"Seasonal"}>Seasonal</option>
                    </Form.Select>
                </Col>
                <Col className="upcoming-checkbox">
                    <Form.Check
                        type={'checkbox'}
                        id={`upcomingRetirement`}
                        label={`Upcoming Retirement`}
                        onChange={(e) => isRetiringSoon(e.target.checked)}
                    />
                </Col>
            </Row>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {[
                            "First Name",
                            "Last Name",
                            "Age",
                            "Date Of Joining",
                            "Title",
                            "Department",
                            "Employee Type",
                            "Status",
                            "Retiring In",
                            "Action",
                        ].map((header) => {
                            return <th className="px-4 py-2" key={header}>{header}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee) => {
                        return (
                            <Employee key={employee.id}
                                handleDelete={handleDelete}
                                data={employee}
                            />
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
