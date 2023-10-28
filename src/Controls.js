function Controls({ dispatch, balance }) {
	return (
		<div className="controls">
			<h2>Controls</h2>
			<p>
				<button
					onClick={() => {
						dispatch({
							type: "handleModal",
							payload: "deposit",
						});
					}}
					disabled={false}
				>
					Deposit
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({
							type: "handleModal",
							payload: "withdraw",
						});
					}}
					disabled={balance === 0}
				>
					Withdraw
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({
							type: "handleModal",
							payload: "loan",
						});
					}}
				>
					Request loan
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({
							type: "handleModal",
							payload: "pay loan",
						});
					}}
					disabled={balance === 0}
				>
					Pay loan
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({
							type: "handleModal",
							payload: "close account",
						});
					}}
				>
					Close account
				</button>
			</p>
		</div>
	);
}

export default Controls;
