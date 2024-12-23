const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();


const connectDB = require("../db");
const userRoutes = require('../routes/user.route');

const Port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRoutes);

connectDB();
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});