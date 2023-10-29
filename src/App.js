import { useReducer, useEffect } from "react";
import Account from "./Account";
import Controls from "./Controls";
import Header from "./Header";
import Modal from "./Modal";
import Transaction from "./Transaction";
import TransactionsTable from "./TransactionsTable";
import Start from "./Start";

const initialState = {
	transactions: [],
	balance: 0,
	loan: 0,
	isModalActive: false,
	status: "start",
	modalType: "",
};

function reducer(state, action) {
	function addTransaction() {
		const id = crypto.randomUUID();
		const transactionType = action.type
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

		return [
			...state.transactions,
			{ id, type: transactionType, amount: action.payload, date: new Date() },
		];
	}

	switch (action.type) {
		case "start":
			return { ...initialState, status: "ready" };

		case "load":
			return {
				...initialState,
				balance: action.payload.balance,
				loan: action.payload.loan,
				status: "ready",
				transactions: action.payload.transactions,
			};

		case "handleModal":
			return {
				...state,
				isModalActive: !state.isModalActive,
				modalType: action.payload,
			};
		case "deposit":
			return {
				...state,
				isModalActive: !state.isModalActive,
				balance: state.balance + action.payload,
				transactions: addTransaction(),
			};

		case "withdraw":
			return {
				...state,
				isModalActive: !state.isModalActive,
				balance: state.balance - action.payload,
				transactions: addTransaction(),
			};

		case "loan":
			return {
				...state,
				isModalActive: !state.isModalActive,
				loan: state.loan + action.payload,
				balance: state.balance + action.payload,
				transactions: addTransaction(),
			};

		case "pay loan":
			return {
				...state,
				isModalActive: !state.isModalActive,
				loan: state.loan - action.payload,
				balance: state.balance - action.payload,
				transactions: addTransaction(),
			};

		case "close account":
			localStorage.removeItem("data");
			return { ...initialState };

		default:
			throw new Error("Action unknown");
	}
}

export default function App() {
	const [
		{ status, isModalActive, transactions, balance, loan, modalType },
		dispatch,
	] = useReducer(reducer, initialState);

	useEffect(function () {
		const savedState = localStorage.getItem("data");

		if (savedState) {
			const parsedState = JSON.parse(savedState);
			dispatch({ type: "load", payload: parsedState });
		}
	}, []);

	useEffect(
		function () {
			if (status === "start") return;

			const savedData = { transactions, balance, loan };
			localStorage.setItem("data", JSON.stringify(savedData));
		},
		[transactions, balance, loan, status]
	);

	return (
		<div className="App">
			<Header status={status} balance={balance} loan={loan} />

			{status === "start" && <Start dispatch={dispatch} status={status} />}
			{status === "ready" && (
				<Account>
					{isModalActive && (
						<Modal
							dispatch={dispatch}
							modalType={modalType}
							balance={balance}
							loan={loan}
						/>
					)}

					<TransactionsTable>
						<Transaction transactions={transactions} />
					</TransactionsTable>
					<Controls dispatch={dispatch} balance={balance} loan={loan} />
				</Account>
			)}
		</div>
	);
}
