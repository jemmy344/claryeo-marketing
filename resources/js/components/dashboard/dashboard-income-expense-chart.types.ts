export type DashboardIncomeExpenseChartData = {
    month: string;
    income: number;
    expenses: number;
};

export type DashboardIncomeExpenseChartProps = {
    config: {
        data: DashboardIncomeExpenseChartData[];
    };
};
