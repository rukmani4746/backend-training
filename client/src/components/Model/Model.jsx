import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'

export default function Model(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{ color: "Black" }}>Are you absolutely sure?</h4>
                <p style={{ color: "Black" }}>
                    This action cannot be undone. This will permanently delete the
                    Book select yes to Delete
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.Flose}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
}
