function Start({ dispatch }) {
	return (
		<div className="start">
			<h3>Hi there!</h3>
			<p>Seem that it's your first time here. You need to open a new account</p>
			<button onClick={() => dispatch({ type: "start" })}>Open account</button>
		</div>
	);
}

export default Start;
