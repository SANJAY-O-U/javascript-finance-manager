export function loadTransaction(){
    let transactions= JSON.parse(localStorage.getItem("transactions")) || [];
    return transactions;
};

export function saveTransaction(transactions){
    localStorage.setItem("transactions",JSON.stringify(transactions));
};
