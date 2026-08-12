export class Transaction{

    constructor(id, title, amount, category, type) {

        this.id = id;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.type = type;

    }

    isExpense() {

        return this.type === "expense";

    }

    isIncome() {

        return this.type === "income";

    }

    getDisplayAmount() {

        return `₹${this.amount}`;

    }
}