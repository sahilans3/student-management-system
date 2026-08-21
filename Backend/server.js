import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import Employee from "./models/employee.js";

dotenv.config();

const app=express();
app.use(express.json());

connectDB();

const PORT=process.env.PORT;

app.use("/api/employees", employeeRoutes);

app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`);
})