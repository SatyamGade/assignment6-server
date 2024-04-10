require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(express.json());
app.use(errorMiddleware);

app.use("/api/auth", authRoutes);

const PORT = 5000;

connectDB().then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Server is listening on ${PORT} PORT`);
    })
})