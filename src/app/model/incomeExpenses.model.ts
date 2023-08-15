export type incomeExpensesType = 'income' | 'expenses'
export class IncomeExpenses {
  constructor(
    public description: string,
    public amount: number,
    public type: incomeExpensesType,
    public uid?: string
  ) {}
}
