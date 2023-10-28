import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";

function Modal({ dispatch, modalType, balance, loan }) {
	const [value, setValue] = useState("");

	return (
		<div className="modal-container">
			<div className="modal">
				{modalType === "deposit" && (
					<Deposit>
						<Form
							dispatch={dispatch}
							modalType={modalType}
							balance={balance}
							loan={loan}
							value={value}
							setValue={setValue}
						/>
					</Deposit>
				)}
				{modalType === "withdraw" && (
					<Withdraw balance={balance} value={value} setValue={setValue}>
						<Form
							dispatch={dispatch}
							modalType={modalType}
							balance={balance}
							loan={loan}
							value={value}
							setValue={setValue}
						/>
					</Withdraw>
				)}
				{modalType === "loan" && (
					<Loan>
						<Form
							dispatch={dispatch}
							modalType={modalType}
							balance={balance}
							loan={loan}
							value={value}
							setValue={setValue}
						/>
					</Loan>
				)}
				{modalType === "pay loan" && (
					<PayLoan
						balance={balance}
						loan={loan}
						value={value}
						setValue={setValue}
					>
						<Form
							dispatch={dispatch}
							modalType={modalType}
							balance={balance}
							loan={loan}
							value={value}
							setValue={setValue}
						/>
					</PayLoan>
				)}
				{modalType === "close account" && (
					<CloseAccount dispatch={dispatch} balance={balance} loan={loan} />
				)}
			</div>
		</div>
	);
}

function Form({ dispatch, modalType, balance, loan, value, setValue }) {
	let isDisabled = false;

	if (!value) {
		isDisabled = true;
	}

	if (balance < value && modalType === "withdraw") {
		isDisabled = true;
	}

	if (loan < value && modalType === "pay loan") {
		isDisabled = true;
	}

	const handleChange = (e) => {
		const inputValue = e.target.value;
		const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
		setValue(onlyNumbers);
	};

	function handleSubmit(e) {
		e.preventDefault();
		console.log(modalType);

		return dispatch({
			type: modalType,
			payload: Number(value ? value : 0),
		});
	}

	function handleCancel(e) {
		e.preventDefault();

		return dispatch({ type: "handleModal" });
	}
	return (
		<form>
			<label>Enter amount</label>
			<input
				type="text"
				placeholder="0"
				value={value}
				onChange={handleChange}
				onSubmit={handleSubmit}
			/>
			<br />
			<button onClick={handleSubmit} disabled={isDisabled}>
				OK
			</button>
			<button onClick={handleCancel}>CANCEL</button>
		</form>
	);
}

function Deposit({ children }) {
	return (
		<>
			<h3>Deposit to account</h3>
			<div className="modal-info">
				<p>How much do you want to deposit?</p>
			</div>
			{children}
		</>
	);
}

function Withdraw({ children, balance, value, setValue }) {
	const [splashText, setSplashText] = useState("");
	const [warnClass, setWarnClass] = useState("");

	useEffect(
		function () {
			if (balance < value) {
				setSplashText("Insufficient founds!");
				setWarnClass("warn");
			} else {
				setSplashText("Enter a withdrawal amount");
				setWarnClass("");
			}
		},
		[balance, value]
	);

	return (
		<>
			<h3>Withdraw from account</h3>
			<p className={warnClass}>{splashText}</p>
			<p>
				The limit is $
				<span className="balance-link" onClick={() => setValue(balance)}>
					{balance}
				</span>
			</p>
			<br />
			{children}
		</>
	);
}

function Loan({ children }) {
	return (
		<>
			<h3>Loan the money</h3>
			<div className="modal-info">
				<p>How much do you want to loan?</p>
			</div>
			{children}
		</>
	);
}

function PayLoan({ children, balance, loan, value, setValue }) {
	const [splashText, setSplashText] = useState("");
	const [warnClass, setWarnClass] = useState("");

	const maxLoanAmount = loan > balance ? balance : loan;

	useEffect(
		function () {
			if (balance < value) {
				setSplashText("You don't need to pay that much!");
				setWarnClass("warn");
			} else {
				setSplashText("Enter amount to pay");
				setWarnClass("");
			}
		},
		[balance, value]
	);

	return (
		<>
			<h3>Pay loan</h3>
			<p className={warnClass}>{splashText}</p>
			<p>
				Pay amount between $
				<span className="balance-link" onClick={() => setValue(1)}>
					1
				</span>{" "}
				and $
				<span className="balance-link" onClick={() => setValue(maxLoanAmount)}>
					{maxLoanAmount}
				</span>
			</p>
			<br />
			{children}
		</>
	);
}

function CloseAccount({ dispatch, balance, loan }) {
	let splashText = "Please confirm deletion";
	let warnClass = "";
	let isDisabled = false;

	if (balance > 0) {
		isDisabled = true;
		warnClass = "warn";
		splashText = `Please empty your balance first! ($${balance})`;
	}
	if (loan > 0) {
		isDisabled = true;
		warnClass = "warn";
		splashText = `Please pay your loan before deletion! ($${loan})`;
	}

	return (
		<>
			<h3>Are you sure?</h3>
			<p className={warnClass}>{splashText}</p>
			<div className="modal-info">
				<br />
				<button
					disabled={isDisabled}
					onClick={() => dispatch({ type: "close account" })}
				>
					YES
				</button>
				<button onClick={() => dispatch({ type: "handleModal" })}>NO</button>
			</div>
		</>
	);
}

export default Modal;
