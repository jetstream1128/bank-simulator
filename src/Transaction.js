function Transaction({ transactions }) {
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	return transactions
		.slice()
		.reverse()
		.map((transaction) => (
			<li key={transaction.id}>
				<p className="type">{transaction.type}</p>
				<p
					className={
						transaction.type === "Deposit" || transaction.type === "Pay Loan"
							? "green"
							: "red"
					}
				>
					{transaction.amount}
				</p>
				<p className="date">
					{new Date(transaction.date).toLocaleString(undefined, options)}
				</p>
			</li>
		));
}

export default Transaction;
