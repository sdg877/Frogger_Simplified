import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../context/BudgetContext";

export default function EditBudgetModal({ show, handleClose, budgetName, currentMax }) {
  const updatedBudgetNameRef = useRef();
  const updatedMaxAmountRef = useRef();
  const { editBudget, getBudgets } = useBudgets();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBudgetName = updatedBudgetNameRef.current.value;
    const updatedMaxAmount = parseFloat(updatedMaxAmountRef.current.value);

    if (updatedBudgetName) {
      editBudget(budgetName, updatedBudgetName, updatedMaxAmount);
      handleClose();
      getBudgets();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="updatedBudgetName">
            <Form.Label>Updated Budget Name</Form.Label>
            <Form.Control
              ref={updatedBudgetNameRef}
              type="text"
              defaultValue={budgetName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="updatedMaxAmount">
            <Form.Label>Updated Max Amount</Form.Label>
            <Form.Control
              ref={updatedMaxAmountRef}
              type="number"
              step="0.01"
              defaultValue={currentMax}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}