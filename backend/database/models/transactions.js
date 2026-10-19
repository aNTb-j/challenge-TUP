import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Transactions = sequelize.define('Transactions' , {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	amount:{
		type: DataTypes.INTEGER,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
    }
}, {
    timestamps: false
});

export default Transactions;