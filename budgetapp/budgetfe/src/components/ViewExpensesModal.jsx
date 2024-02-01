import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import EditExpenseModal from "./EditExpenseModal"; 
import { useState } from 'react';


export default function ViewExpensesModal({ budgetId, handleClose }) {

  const { budgets, getBudgetExpenses, deleteExpense, deleteBudget } = useBudgets();
  
  let realBudgetId = budgetId
  
  if (UNCATEGORISED_BUDGET_ID === budgetId) {
    const unCatBid = budgets.find((b) => b.name === UNCATEGORISED_BUDGET_ID)
    realBudgetId = unCatBid._id
  }
   
  const expenses = getBudgetExpenses(realBudgetId);
  const budget =
    UNCATEGORISED_BUDGET_ID === budgetId
      ? { name: "Uncategorised", id: UNCATEGORISED_BUDGET_ID }
      : budgets.find((b) => b._id === budgetId);

      const [editExpenseModalShow, setEditExpenseModalShow] = useState(false);
      const [selectedExpense, setSelectedExpense] = useState(null);
    
      const handleEditExpense = (expense) => {
        setSelectedExpense(expense);
        setEditExpenseModalShow(true);
      };

  return (
    <Modal show={budgetId !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORISED_BUDGET_ID && (
              <Button variant="outline-danger" onClick={() => {
                deleteBudget(budget._id)
                handleClose()
              }}>Delete</Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense._id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button size="sm" variant="outline-danger" onClick={() => deleteExpense(expense._id)}>
                &times;
              </Button>
              <Button size="sm" variant="outline-secondary" onClick={() => handleEditExpense(expense)}>
                Edit
              </Button>
              
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
      {selectedExpense && (
        <EditExpenseModal
          show={editExpenseModalShow}
          handleClose={() => setEditExpenseModalShow(false)}
          expense={selectedExpense}
        />
      )}
    </Modal>
  );
}


