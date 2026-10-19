import express from 'express';
import { sequelize } from './database/database.js';

import router from "./routes/transaction.routes.js";

const app = express();

const port = 3000;

try {
	app.use(express.json());
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', '*');
		next();
	});

	app.listen(port);

	app.use(router)

	await sequelize.sync()

} catch (error) {
	console.error('Imposible realizar la transaccion')
}