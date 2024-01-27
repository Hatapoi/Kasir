import db from "../config/database.js";
import { Sequelize } from "sequelize";

const {DataTypes} = Sequelize;

const Kasir = db.define('kasir', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.INTEGER
}, {
    freezeTableName: true
});

export default Kasir;

(async () => {
    await db.sync()
})();