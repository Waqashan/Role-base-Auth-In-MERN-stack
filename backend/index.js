const express = require("express");
const app = express();
require("dotenv").config();
const db = require('./api/db-config/db_config')
const PORT = process.env.PORT ?process.env.PORT:3000
const userRoutes = require("./api/routes/user_routes");
const productRoutes = require("./api/routes/product_routes");
var cors = require('cors')
app.use(cors({
  origin:'http://localhost:5173'
}));

db();
app.use(express.json());
app.use("/api", userRoutes,productRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
