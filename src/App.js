/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

import { useReducer } from "react";
import Account from "./Account";
import Controls from "./Controls";
import Header from "./Header";
import Modal from "./Modal";
import Transaction from "./Transaction";
import TransactionsTable from "./TransactionsTable";
import Start from "./Start";

const trans = [
	{
		id: 1,
		type: "Withdraw",
		amount: 50,
		date: "2023-10-21",
	},
	{
		id: 2,
		type: "Deposit",
		amount: 100,
		date: "2023-10-22",
	},
	{
		id: 3,
		type: "Loan",
		amount: 1000,
		date: "2023-10-22",
	},
	{
		id: 4,
		type: "Pay Loan",
		amount: 500,
		date: "2023-10-22",
	},
];

const initialState = {
	transactions: [],
	balance: 244,
	loan: 500,
	isActive: false,
	status: "start",
	modalContent: { header: "", amount: 0 },
};

function reducer(state, action) {
	switch (action.type) {
		case "start":
			// state.transactions = [...trans];
			return { ...initialState, status: "ready", transactions: [...trans] };

		case "handleModal":
			return {
				...state,
				isActive: !state.isActive,
				modalContent: { header: action.payload, amount: action.payload },
			};
		case "deposit":
			return {
				...state,
				isActive: !state.isActive,
				balance: state.balance + action.payload,
			};

		default:
			throw new Error("Action unknown");
	}
}

export default function App() {
	const [
		{ status, isActive, transactions, balance, loan, modalContent },
		dispatch,
	] = useReducer(reducer, initialState);

	return (
		<div className="App">
			<Header status={status} balance={balance} loan={loan} />

			{status === "start" && <Start dispatch={dispatch} status={status} />}
			{status === "ready" && (
				<Account>
					{isActive && (
						<Modal dispatch={dispatch} modalContent={modalContent} />
					)}

					<TransactionsTable>
						<Transaction transactions={transactions} />
					</TransactionsTable>
					<Controls dispatch={dispatch} />
				</Account>
			)}
		</div>
	);
}
