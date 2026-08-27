import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import routes from "./routes/index.js";



dotenv.config();

const app=express();
app.use(express.json());

connectDB();

const PORT=process.env.PORT;

app.use("/api/employees", employeeRoutes);
app.use("/api", routes);

app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`);
})