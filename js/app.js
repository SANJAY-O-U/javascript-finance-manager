import { loadTransaction, saveTransaction } from "./storage.js";
import { calculateIncome, calculateExpense, calculateBalance } from "./calculations.js";
console.log("Finance Manager started!");

const balanceElement = document.querySelector("#balance");
const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");


/*let transactions = [
    {
        id: 1,
        title: "Salary",
        amount: 50000,
        category: "Job",
        type: "income"
    },

    {
        id: 2,
        title: "Rent",
        amount: 12000,
        category: "Housing",
        type: "expense"
    },

    {
        id: 3,
        title: "Food",
        amount: 3000,
        category: "Food",
        type: "expense"
    },
    {
        id:4,
        title:"Freelance",
        amount: 10000,
        category:"Job",
        type:"income"
    },
    {
        id:5,
        title:"Shopping",
        amount: 2500,
        category:"Shopping",
        type:"expense"
    }
];*/
let transactions= loadTransaction();
let editingTransactionId= null;

//Update Dashboard
function updateDashboard() {

    const income = calculateIncome(transactions);

    const expense = calculateExpense(transactions);

    const balance = calculateBalance(transactions);

    incomeElement.textContent = income;

    expenseElement.textContent = expense;

    balanceElement.textContent = balance;
}
updateDashboard();
//render Transaction
const transactionList=document.querySelector("#transactionList");
function renderTransaction(transactionArray){
    transactionList.innerHTML="";
    for(let transaction of transactionArray){
        const transactionElement=document.createElement("div");
        transactionElement.classList.add("transaction");
        transactionElement.innerHTML=`
        <div id="${transaction.id}">
        <br>
            <strong>${transaction.title}</strong>
            <span>₹${transaction.amount}</span>
            <span>${transaction.category}</span>
            <span>${transaction.type}</span>
            <button class="delete-btn" data-id="${transaction.id}">Delete</button>
            <button class="edit-btn" data-id="${transaction.id}">Edit</button>
        <div>
        `;
        transactionList.appendChild(transactionElement);
    }
};
//transaction From
const transactionForm = document.querySelector("#transactionForm");
const inputTitle=document.getElementById("title");
const inputType=document.getElementById("type");
const inputAmount=document.getElementById("amount");
const inputCategory= document.getElementById("category");
const submitBtn = document.querySelector("#submitBtn");
transactionForm.addEventListener("submit",(e)=>{
    console.log("Form Submitted");
    e.preventDefault();
    const transaction={
        id:Date.now(),
        title: inputTitle.value,
        amount: Number(inputAmount.value),
        category:inputCategory.value,
        type: inputType.value
    }
    if(editingTransactionId===null){
        transactions.push(transaction);
        saveTransaction();
    }
    else{
        const transaction_edit=transactions.find(element=>element.id===editingTransactionId);
        transaction_edit.title=inputTitle.value;
        transaction_edit.amount=Number(inputAmount.value);
        transaction_edit.category=inputCategory.value;
        transaction_edit.type=inputType.value;
        editingTransactionId===null;
        saveTransaction();
    }
    updateDashboard();
    renderTransaction(transactions);
    transactionForm.reset();
    submitBtn.textContent = "Add Transaction";

});
//delete and edit Transaction
transactionList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete-btn")){
        const transactionId= Number(e.target.dataset.id);
        transactions=transactions.filter((transaction)=>transaction.id !=transactionId);
        saveTransaction();
        updateDashboard();
        document.getElementById(transactionId).remove();
    }
    if (event.target.classList.contains("edit-btn")) {

    const id = Number(event.target.dataset.id);

    const transaction = transactions.find(
        transaction => transaction.id === id
    );
    editingTransactionId= id;
    inputTitle.value = transaction.title;
    inputAmount.value = transaction.amount;
    inputCategory.value = transaction.category;
    inputType.value = transaction.type;
    submitBtn.textContent = "Update Transaction";
    }
});
//search and type filter
const searchInput=document.querySelector("#searchInput");
const typeFilter= document.querySelector("#typeFilter");
const sortSelect= document.querySelector("#sortSelect");
function getFilteredTransactions(){
    const searchTerm= searchInput.value.toLowerCase();
    const selectedType= typeFilter.value;
    const sortOption= sortSelect.value;
    let result= transactions;
    result=result.filter(transaction=>transaction.title.toLowerCase().includes(searchTerm));
    if(selectedType !== "all"){
        result=result.filter(transaction=>transaction.type == selectedType);
    }
    if(sortOption==="amount-high"){
        result.sort((a,b)=>b.amount-a.amount);
    }
    if(sortOption==="amount-low"){
        result.sort((a,b)=>a.amount-b.amount);
    }
    if(sortOption==="title"){
        result.sort((a,b)=>a.title.localeCompare(b.title));
    }
    return result;

}

searchInput.addEventListener("input",()=>{
    console.log(searchInput);
    renderTransaction(getFilteredTransactions());
})

sortSelect.addEventListener("change",()=>{
    renderTransaction(getFilteredTransactions());
})