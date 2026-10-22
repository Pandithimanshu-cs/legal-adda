const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

let lawyers = [
  {
    id: 1,
    name: "Rahul Sharma",
    type: "Criminal",
    rating: 4.5,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Anita Verma",
    type: "Family",
    rating: 4.8,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Mohit Gupta",
    type: "Corporate",
    rating: 4.2,
    image: "https://via.placeholder.com/150"
  }
];

// REGISTER
app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({ message: "Registered Successfully" });
});

// LOGIN
app.post("/login", (req, res) => {
  const user = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );

  if (user) res.json({ success: true, user });
  else res.json({ success: false });
});

// GET LAWYERS
app.get("/lawyers", (req, res) => {
  res.json(lawyers);
});

// HIRE
app.post("/hire", (req, res) => {
  res.json({ message: "Lawyer hired successfully!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));