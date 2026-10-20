import Transactions from "../database/models/transactions.js";


// GET

export const getAllTransactionData = async (req, res) => {
	const transaction = await Transactions.findAll();
	res.json(transaction);
};


// POST
export const creatTransaction = async (req, res) => {
	const { amount, description } = req.body;

	if (amount < 0 || !description?.trim()) {
		return res.status(400).json({ message: "El amount debe ser mayor a 0 y description deben estar completo" })
	}

	const transaccion = await Transactions.create({
		amount,
		description
	})

	res.status(200).json({ message: "Transaccion aprobada" })
};