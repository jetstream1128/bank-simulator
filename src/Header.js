function Header({ status, balance, loan }) {
	return (
		<div className="header">
			<h1>
				<span>useReducer</span> Bank Account
			</h1>
			{status === "start" ? null : (
				<div>
					<p>
						Balance: <span className="green">{balance}</span>{" "}
					</p>
					<p>
						Loan: <span className="red">{loan}</span>
					</p>
				</div>
			)}
		</div>
	);
}

export default Header;
