import { Button, Form, Modal } from "react-bootstrap";
import { useRef, useState } from "react";
import { useBudgets, UNCATEGORISED_BUDGET_ID } from "../context/BudgetContext";



export default function EditExpenseModal({
  show,
  handleClose,
  expense,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { budgets, editExpense, getExpenses } = useBudgets();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expenses/${expense._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedExpense),
        });
  
        if (response.ok) {
          // Optionally, you can handle the updated data or close the modal here
          handleClose();
          getExpenses();
        } else {
          console.error('Error updating expense:', response.status);
        }
      } catch (error) {
        console.error('Error updating expense:', error);
      }
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type="text"
              defaultValue={expense.description}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              defaultValue={expense.amount}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={expense.budgetId._id} ref={budgetIdRef}>
              <option id={UNCATEGORISED_BUDGET_ID}>Uncategorised</option>
              {budgets.map((budget) => (
                <option key={budget._id} value={budget._id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}







