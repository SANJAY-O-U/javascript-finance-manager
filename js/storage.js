import {Transaction} from "./Transaction.js";
export function loadTransaction() {

    const data =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

    return data.map(transaction =>
        new Transaction(
            transaction.id,
            transaction.title,
            transaction.amount,
            transaction.category,
            transaction.type
        )
    );

};

export function saveTransaction(transactions){
    localStorage.setItem("transactions",JSON.stringify(transactions));
};
