import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import UncategorisedBudgetCard from "./components/UncategorisedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useEffect, useState } from "react";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "./context/BudgetContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [editExpense, setEditExpense] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
    useState(null);

  const { budgets, getBudgets, getBudgetExpenses } = useBudgets();

  const handleEditBudget = (budgetName) => {
    console.log(`Editing budget: ${budgetName}`);
  };

  function openAddExpenseModalId(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  useEffect(() => {
    getBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setShowAddExpenseModal(true)}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            if (budget.name !== "Uncategorised") {
              const exp = getBudgetExpenses(budget._id);
              const amount = exp
                ? exp.reduce((total, e) => total + e.amount, 0)
                : 0;
              return (
                <BudgetCard
                  key={budget._id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModalId(budget._id)}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(budget._id)}
                  handleEditBudget={() => handleEditBudget(budget.name)}
            
                />
              );
            }
            return null;
          })}
          <UncategorisedBudgetCard
            onAddExpenseClick={() =>
              openAddExpenseModalId(UNCATEGORISED_BUDGET_ID)
            }
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORISED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => {
          setShowAddExpenseModal(false);
          setAddExpenseModalBudgetId();
        }}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId(null)}
      />
    </>
  );
}

export default App;