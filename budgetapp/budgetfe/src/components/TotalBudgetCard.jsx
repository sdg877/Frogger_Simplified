import { useBudgets } from "../context/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets()

    const amount = expenses ? expenses.reduce((total, e) => total + e.amount, 0): 0
    const max = budgets ? budgets.reduce((total, b) => total + b.max, 0): 0

  return (
    <BudgetCard gray amount={amount} max={max} name="Total" hideButtons />
  )
}