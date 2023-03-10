require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

// const sequelize = process.env.NODE_ENV === "production" 
//   ? new Sequelize({
//     database: DB_NAME,
//     dialect: "postgres",
//     host: DB_HOST,
//     username: DB_USER,
//     password: DB_PASSWORD,
//     port: DB_PORT,
//     pool: {
//       max: 3,
//       min: 1,
//       idle: 10000
//     },
//     dialectOptions: {
//       ssl: {
//         require: true,
//         //Ref.: https://github.com/brianc/node-postgres/issues/2009
//         rejectUnauthorized: false
//       },
//       keepAlive: true
//     },
//     ssl: true,
//   })
//   : new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//     { logging: false, native: false }
//   );

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Orders, User } = sequelize.models;

// Aca vendrian las relaciones
//1:N (User - Orders)
// Orders.belongsTo(User);
// User.hasMany(Orders);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
