let transactions = JSON.parse(localStorage.getItem("expense_transactions")) || [];

const balanceEl = document.getElementById("totalBalance");
const incomeEl = document.getElementById("totalIncome");
const expenseEl = document.getElementById("totalExpense");
const transactionListEl = document.getElementById("transactionList");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

function updateLocalStorage() {
    localStorage.setItem("expense_transactions", JSON.stringify(transactions));
}

function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balanceEl.textContent = `₹${total}`;
    incomeEl.textContent = `+₹${income}`;
    expenseEl.textContent = `-₹${expense}`;
}

function renderTransactions() {
    transactionListEl.innerHTML = "";

    if (transactions.length === 0) {
        transactionListEl.innerHTML = `<li style="justify-content:center; color:#94a3b8; font-size:13px; border-right:none;">No transactions added yet.</li>`;
        return;
    }

    transactions.forEach(t => {
        const sign = t.amount < 0 ? "-" : "+";
        const itemClass = t.amount < 0 ? "minus" : "plus";
        const li = document.createElement("li");
        li.classList.add(itemClass);

        li.innerHTML = `
            <span>${t.text}</span>
            <div>
                <strong>${sign}₹${Math.abs(t.amount)}</strong>
                <button class="delete-btn" onclick="removeTransaction(${t.id})">✕</button>
            </div>
        `;

        transactionListEl.appendChild(li);
    });
}

function addTransaction(e) {
    e.preventDefault();

    const textValue = textInput.value.trim();
    const amountValue = Number(amountInput.value);

    if (textValue === "" || isNaN(amountValue) || amountValue === 0) {
        alert("Please enter a valid description and non-zero amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: textValue,
        amount: amountValue
    };

    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    updateValues();

    textInput.value = "";
    amountInput.value = "";
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    renderTransactions();
    updateValues();
}

// Initial Call
renderTransactions();
updateValues();