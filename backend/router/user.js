const express = require("express");
const router = express.Router();
const db = require("../dbconfig");

router.get("/get-users", async (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    res.status(200).json({ message: "Retrieved Successfully", data });
  });
});

router.get("/get-user/:email", async (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (data.length <= 0) {
      return res.status(400).json({ message: `${email} does not exist` });
    } else {
      res.status(200).json({ message: "Retrieved successfully", data });
    }
  });
});

router.post("/add-users", async (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO users SET ?`;

  db.query(sql, req.body, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    res.status(200).json({ message: "Added Sucessfully", data });
  });
});

router.put("/update-user/:email", (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;

  const values = [updatedData.name, updatedData.dob, email];

  const sql = "UPDATE users SET name = ?, dob = ? WHERE email = ?";
  // const updateQuery = 'UPDATE your_table_name SET column1 = ?, column2 = ? WHERE id = ?';
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(404).json({ message: "Failed to update", err });
    }
    res.status(200).json({ message: "Update Successfully" });
  });
});

module.exports = router;
