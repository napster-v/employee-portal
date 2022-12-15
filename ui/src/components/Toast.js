import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function MyToast(props) {
  library.add(faCircleCheck, faTriangleExclamation);
  /* let className;
  switch (props.type) {
    case "success":
      className = `alert alert-success shadow-lg max-w-max mx-auto`;
      break;
    case "error":
      className = `alert alert-error shadow-lg max-w-max mx-auto`;
      break;
    case "warning":
      className = `alert alert-warning shadow-lg max-w-max mx-auto`;
      break;
    default:
      className = `alert alert-info shadow-lg max-w-max mx-auto`;
  } */

  return (
    <ToastContainer position="top-end">
      <Toast show={props.show}>
        <Toast.Header>
          <FontAwesomeIcon
            className="rounded me-2"
            icon={`fa-solid ${props.icon}`}
          />
          <strong className="me-auto">{props.type}</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MyToast;
