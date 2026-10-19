import Transactions from "../database/models/transactions.js";


// GET
export const getTransactionData = async (req, res) => {
	const transactionId = req.params.id;
	const transaction = await Transactions.findByPk(transactionId);
	res.json(transaction);
};

// POST
export const creatTransaction = async (req, res) => {
	const { amount, description } = req.body;

	if (amount < 0) {
		return res.status(400).json({ message: "El amount no puede ser menor a 0" })
	}

	const transaccion = await Transactions.create({
		amount,
		description
	})

	res.status(200).json({ message: "Transaccion aprobada" })
};