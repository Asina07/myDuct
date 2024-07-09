const express = require("express");
const color = require("colors"); //to change running server color in teminal
const morgan = require("morgan"); // to get info of api we have hit--good for debug
const dotenv = require("dotenv");
const mySqlPool = require("./confg/db");
const cors = require("cors");

// config env
dotenv.config();
// rest obj
const app = express();

// middleware -----------------------
app.use(morgan("dev"));
app.use(express.json()); // allow json data in the req body
app.use(
  cors({
    origin: ["http://localhost:3001"],
     methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
); // Use the cors middleware
//  route
app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello world</h1>");
});

app.use("/api/duct", require("./routes/ductRoutes"));
// middleware ends-----------------

// port
const PORT = process.env.PORT || 8000;

// conditinaly listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    // mysql
    console.log("mySql DB Connected".bgCyan.white);

    // listen port
    app.listen(PORT, () => {
      console.log(
        `Server Running Successfully on Port ${PORT}`.bgMagenta.white
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
