import Table from "react-bootstrap/Table";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import styles from "../../styles/Home.module.css";
import { ModalComponent } from "./Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import useRequest from "../../hooks/useRequest";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";

/**
 * Component that renders each Table row with
 * update and delete functionalities
 */
function TableBodyItem({ item }) {
  // State variables for Modals
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // State variables for controlled inputs
  const [empId, setEmpId] = useState(item.empId);
  const [firstname, setFirstname] = useState(item.firstname);
  const [lastname, setLastname] = useState(item.lastname);
  const [city, setCity] = useState(item.city);
  const [address, setAddress] = useState(item.address);
  const [mobile, setMobile] = useState(item.mobile);

  // Check if JWT is present or not (with server-side and client-side handling)
  let jwt;
  if (typeof window !== "undefined") {
    jwt = localStorage.getItem("jwt");
  }

  const handleDelete = () => {
    setModal(true);
  };

  // Hook to make delete request to backend
  const { doRequest, errors } = useRequest({
    url: `http://localhost:5000/api/emp/${item.empId}/delete`,
    method: "delete",
    onSuccess: () => {
      window.location.href = "/";
    },
  });
  const handleConfirmDelete = async () => {
    await doRequest();
  };

  // Hook to make update request to backend
  const { doRequest: update, errors: error } = useRequest({
    url: `http://localhost:5000/api/emp/update/${item.empId}`,
    method: "put",
    body: {
      empId,
      firstname,
      lastname,
      city,
      address,
      mobile,
      jwt,
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const handleUpdate = async () => {
    await update();
  };
  return (
    <>
      {/* Delete Modal */}
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Dialog>Employee Id: {item.empId}</Modal.Dialog>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Update Confirmation Modal*/}
      <Modal show={updateModal} onHide={() => setUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to update?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Dialog>Employee Id: {item.empId}</Modal.Dialog>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(true);
              setUpdateModal(false);
            }}
          >
            No
          </Button>
          <Button variant="danger" onClick={handleUpdate}>
            Yes
          </Button>
        </Modal.Footer>
        {errors}
      </Modal>

      {/* Actual Update modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Toast
          delay={3000}
          onClose={() => setToast(false)}
          autohide
          show={toast}
        >
          <Toast.Header className="bg-success">
            <strong style={{ color: "white" }} className="me-auto white">
              Employee Added/Modified successfully
            </strong>
          </Toast.Header>
        </Toast>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>

        {/* Modal that contains the update form */}
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
        {/* Render errors if any */}
        {errors}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShow(false);
              setUpdateModal(true);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Table rows */}
      <tr>
        <td>{item.empId}</td>
        <td>{item.firstname + " " + item.lastname}</td>
        <td>{item.address}</td>
        <td>{item.mobile}</td>
        <td>{item.city}</td>
        <td scope="row">
          <center>
            <FiEdit
              onClick={() => setShow(true)}
              size={20}
              className={styles.hover}
            />
          </center>
        </td>
        <td>
          <center>
            <AiFillDelete
              onClick={handleDelete}
              size={20}
              className={styles.hover}
            />
          </center>
        </td>
      </tr>
    </>
  );
}

/**
 * Component to render whole table along with CRUD Functionalities
 */
export function TableComponent({ emp }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <ModalComponent
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <Button className="my-5" onClick={handleShow} variant="success">
        Add Employee
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Emp ID:</th>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {emp.map((item, idx) => {
            return <TableBodyItem key={idx} item={item} />;
          })}
        </tbody>
      </Table>
    </>
  );
}
