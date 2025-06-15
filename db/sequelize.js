import { Sequelize } from "sequelize";

// Host name: dpg-d16jl4umcj7s73c7m7ng-a.frankfurt-postgres.render.com

console.log(process.env);

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialectOptions: {
    ssl: true,
  },
});

try {
  sequelize.authenticate();
  console.log("Database connection successful");
} catch (error) {
  console.log("Failed connect database");
  console.log(error);
  //   process.exit(1);
}

export default sequelize;
