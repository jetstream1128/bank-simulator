function Start({ dispatch }) {
	return (
		<div className="start">
			<h3>Hi there!</h3>
			<p>
				It seems like you're new to this platform. In order to get started,
				you'll need to create a new account. Just below this message, you'll
				find a button – go ahead and click on it to begin the account creation
				process. We're here to help you get started on your journey!
			</p>
			<button onClick={() => dispatch({ type: "start" })}>Open account</button>
		</div>
	);
}

export default Start;
