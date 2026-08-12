export function validateTransaction(data){
    if(data.title.trim===""){
        throw new Error("Transaction title is required.");
    }

    if (data.amount <= 0) {
        throw new Error("Amount must be greater than zero.");
    }
    if (data.category.trim() === "") {
    throw new Error("Category is required.");
    }
    if (
    data.type !== "income" &&
    data.type !== "expense"
) {
    throw new Error("Invalid transaction type.");
}

}