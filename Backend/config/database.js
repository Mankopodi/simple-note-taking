const { Pool } = require("pg"); // This will help us connect to the database.(line 1)
require("dotenv").config();
const connectionString = process.env.PSQL_CONNECTION; // contains our database’s connection URL.(line 3)
const pool = new Pool({ //pool: Initialize a Pool instance and pass in the connectionString into the constructor. (line 4)
  connectionString,  //This builds a connection between our project and our database.
});

module.exports = {
  query: (text, params) => pool.query(text, params), // Export the query method, which will run SQL commands.(line 8-10)

}