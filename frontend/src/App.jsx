import { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"

export const App = () => {
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');

	const [transactions, setTransactions] = useState([]);

	const [error, setError] = useState('');

	const handleAmount = (e) => {
		setAmount(e.target.value);
	};

	const handleDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			amount,
			description
		};

		try {
			const response = await fetch(
				"http://localhost:3000/transactions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				}
			);

			if (!response.ok) {
				throw new Error("No se pudo guardar la transacción");
			}

			await response.json();

			handleAddTransaction(data);

			setAmount('');
			setDescription('');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleAddTransaction = (newTransaction) => {
		if (!newTransaction) return;
		setTransactions(prevState => [...prevState, newTransaction]);
	};

	useEffect(() => {
		const loadTransactions = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/transactions"
				);

				if (!response.ok) {
					throw new Error("No se pudieron cargar las transacciones");
				}

				const data = await response.json();

				setTransactions(
					Array.isArray(data) ? data : data.transactions ?? []
				);
			} catch (error) {
				setError(error.message);
			}
		};

		loadTransactions();
	}, []);

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Amount</Form.Label>
					<Form.Control
						type="number"
						placeholder="0.0$"
						onChange={handleAmount}
						value={amount} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Descripcion</Form.Label>
					<Form.Control
						as="textarea"
						rows={5} onChange={handleDescription}
						value={description} />
				</Form.Group>
				<Button type="submit">
					Cargar
				</Button>
			</Form>
			<>

				<section>
					{error && <p>{error}</p>}

					{transactions.length > 0 ? (
						transactions.map(transaction => (
							<div key={transaction.id}>
								<p>Monto: {transaction.amount}</p>
								<p>Descripción: {transaction.description}</p>
							</div>
						))
					) : (
						<p>No hay transacciones</p>
					)}
				</section>
			</>
		</div>
	)
}

export default App;
