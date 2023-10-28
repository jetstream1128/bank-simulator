function Controls({ dispatch }) {
	return (
		<div className="controls">
			<h2>Controls</h2>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "handleModal", payload: "Deposit" });
					}}
					disabled={false}
				>
					Deposit
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "handleModal", payload: "Withdraw" });
					}}
					disabled={false}
				>
					Withdraw
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "handleModal", payload: "Request a loan" });
					}}
					disabled={false}
				>
					Request loan
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "handleModal", payload: "Pay loan" });
					}}
					disabled={false}
				>
					Pay loan
				</button>
			</p>
			<p>
				<button onClick={() => {}} disabled={false}>
					Close account
				</button>
			</p>
		</div>
	);
}

export default Controls;
