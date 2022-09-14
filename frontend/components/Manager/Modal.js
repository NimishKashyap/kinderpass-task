import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import useRequest from "../../hooks/useRequest";

export function ModalComponent({ show, handleShow, handleClose }) {
  const [empId, setEmpId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  let jwt = "";

  const [toast, setToast] = useState(false);
  if (typeof window !== "undefined") {
    jwt = localStorage.getItem("jwt");
  }

  const { doRequest, errors } = useRequest({
    url: "http://localhost:5000/api/emp/create",
    method: "post",
    body: {
      city,
      address,
      empId,
      firstname,
      lastname,
      mobile,
      jwt,
    },
    onSuccess: () => {
      console.log("Created");
      setEmpId("");
      setFirstname("");
      setLastname("");
      setCity("");
      setAddress("");
      setMobile("");

      setToast(true);
    },
  });

  const handleSubmit = async () => {
    const data = await doRequest();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Toast
          delay={3000}
          onClose={() => setToast(false)}
          autohide
          show={toast}
        >
          <Toast.Header className="bg-success">
            <strong style={{ color: "white" }} className="me-auto white">
              Employee Added successfully
            </strong>
          </Toast.Header>
        </Toast>
        <Modal.Header closeButton>
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId" className="mb-3">
              <Form.Label>Employee Id</Form.Label>
              <Form.Control
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                type="text"
                placeholder="Enter Emp Id"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicFName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                placeholder="Enter Firstname"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicLName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                placeholder="Enter Lastname"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Enter city"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicAdd" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter address"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicMobile" className="mb-3">
              <Form.Label>Mobile No: </Form.Label>
              <Form.Control
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                placeholder="Enter Mobile number"
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {errors}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
