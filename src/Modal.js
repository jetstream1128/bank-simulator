import { useState } from "react";

function Modal({ dispatch, modalContent }) {
	const [value, setValue] = useState();

	function handleSubmit(e) {
		e.preventDefault();

		return dispatch({
			type: "deposit",
			payload: Number(value ? value : 0),
		});
	}

	return (
		<div className="modal-container">
			<div className="modal">
				<h3>{modalContent.header}</h3>
				<form>
					<label>Enter amount</label>
					<input
						type="text"
						placeholder="0"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onSubmit={handleSubmit}
					/>
					<br />
					<button onClick={handleSubmit}>OK</button>
				</form>
			</div>
		</div>
	);
}

export default Modal;
