function Transaction({ transactions }) {
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	const types = {
		Deposit: ["▲", "green"],
		Withdraw: ["▼", "red"],
		Loan: ["▶", "yellow smaller"],
		"Pay Loan": ["◀", "orange smaller"],
	};

	return transactions
		.slice()
		.reverse()
		.map((transaction) => (
			<li key={transaction.id}>
				<span className={types[transaction.type][1]}>
					{types[transaction.type][0]}
				</span>

				<p className="type">{transaction.amount} USD</p>
				<p className="">{transaction.type}</p>
				<p className="date">
					{new Date(transaction.date).toLocaleString(undefined, options)}
				</p>
			</li>
		));

	// return transactions
	// 	.slice()
	// 	.reverse()
	// 	.map((transaction) => (
	// 		<li key={transaction.id}>
	// 			{transaction.type === "Deposit" || transaction.type === "Loan" ? (
	// 				<span className="green">▲</span>
	// 			) : (
	// 				<span className="red">▼</span>
	// 			)}

	// 			<p className="type">{transaction.amount} USD</p>
	// 			<p className="">{transaction.type}</p>
	// 			<p className="date">
	// 				{new Date(transaction.date).toLocaleString(undefined, options)}
	// 			</p>
	// 		</li>
	// 	));
}

export default Transaction;
