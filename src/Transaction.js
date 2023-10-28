function Transaction({ transactions }) {
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	return transactions
		.slice()
		.reverse()
		.map((transaction) => (
			<li key={transaction.id}>
				{transaction.type === "Deposit" || transaction.type === "Pay Loan" ? (
					<span className="green">▲</span>
				) : (
					<span className="red">▼</span>
				)}

				<p className="type">{transaction.type}</p>
				<p>{transaction.amount} USD</p>
				<p className="date">
					{new Date(transaction.date).toLocaleString(undefined, options)}
				</p>
			</li>
		));
}

export default Transaction;
