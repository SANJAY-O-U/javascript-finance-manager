export function calculateIncome(transactions) {

    return transactions
        .filter(transaction => transaction.type === "income")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

}
export function calculateExpense(transactions) {

    return transactions
        .filter(transaction => transaction.type === "expense")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

}
export function calculateBalance(transactions) {

    const income = calculateIncome(transactions);

    const expense = calculateExpense(transactions);

    return income - expense;

}