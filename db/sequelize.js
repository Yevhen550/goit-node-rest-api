import { Sequelize } from "sequelize";

// Host name: dpg-d16jl4umcj7s73c7m7ng-a.frankfurt-postgres.render.com

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "dpg-d16jl4umcj7s73c7m7ng-a.frankfurt-postgres.render.com",
  port: 5432,
  database: "db_contacts_bea7",
  username: "db_contacts_bea7_user",
  password: "UFfEh1nUD5lLaUrdNLCtBi0wHpLrIH1f",
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
