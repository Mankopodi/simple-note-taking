const db = require("./config/database"); //Import our database config, Express, and Morgan into our project.(line 1-3)
const express = require("express");
const morgan = require("morgan");
const create = require("./routes/create");
const read = require("./routes/read");
const update = require("./routes/update");
const del = require("./routes/del");


const app = express(); // app is used to replace the express. instead of using express we use app(line 4)

app.set("view engine", "pug"); // Tell Express that our view engine will be Pug.(line 7)
app.use(express.urlencoded({ extended: true })); //This middleware parses incoming requests with urlencoded payloads and is based on body-parser.(line 8)
app.use(morgan("dev"));
app.use("/create", create);
app.use("/read", read);
app.use("/update", update);
app.use("/delete", del);

app.get("/", async (req, res) => { //Handle the / directory.(line 11)
  const query = ` 
    SELECT * FROM Note
    ORDER BY id;
    `; //This will be our query. Here, we are telling PostgreSQL to list all of our records in the database. In the end, display them in ascending order of id.(line 11-15)
  const { rows } = await db.query(query); //Run the query.(line 16)
  res.render("index",{item: rows}) //Log out JSON output, which contains the list of our records in the database.(line 17)
});

app.use("/create", create)

app.listen(3000, () => { //Tell Express to run this app on the port 3000.(line 20)
  console.log("At port 3000");
});