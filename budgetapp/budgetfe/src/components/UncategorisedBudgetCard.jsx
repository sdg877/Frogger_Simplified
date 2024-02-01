import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../context/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function UncategorisedBudgetCard(props) {
    const { getBudgetExpenses, budgets } = useBudgets()
    const uncategorisedBudget = budgets.find(
        budget => budget.name === UNCATEGORISED_BUDGET_ID
    )
    const exp = getBudgetExpenses(uncategorisedBudget?._id)
    const amount = exp ? exp.reduce((total, e) => total + e.amount, 0): 0
    if(amount === 0) return null
  return (
    <BudgetCard gray amount={amount} name={uncategorisedBudget?.name} {...props} />
  )
}