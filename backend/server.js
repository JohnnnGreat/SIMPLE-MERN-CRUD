const express = require("express");
const db = require("./dbconfig.js");
const usersRoutes = require("./router/user.js");
const cors = require("cors");

// Initialized Express App
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);

app.listen(8800, () => console.log(`Server started on port ${8800}`));
