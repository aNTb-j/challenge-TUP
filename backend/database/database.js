import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './transactions.db'
});

export { sequelize };