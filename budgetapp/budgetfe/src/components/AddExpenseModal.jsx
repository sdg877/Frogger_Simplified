import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets, UNCATEGORISED_BUDGET_ID } from "../context/BudgetContext";

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { budgets, addExpense, getBudgets, getExpenses } = useBudgets();

  async function handleSubmit(e) {
    e.preventDefault()
    await addExpense({
        desciption: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value),
        budgetId: budgetIdRef.current.value
    })
    handleClose()
    getExpenses()
    getBudgets()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORISED_BUDGET_ID}>Uncategorised</option>
              {budgets.map((budget) => (
                <option key={budget._id} value={budget._id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
                Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}