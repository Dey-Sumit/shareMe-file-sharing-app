import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import fileRoute from "./routes/files";
import downloadRoute from "./routes/download";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//hack :( for typescript global
const globalAny: any = global;
globalAny.__basedir = __dirname;
console.log(globalAny.__basedir);

const PORT = process.env.PORT || 3000;
connectDB();

app.use("/api/files", fileRoute);
app.use("/api/download", downloadRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
