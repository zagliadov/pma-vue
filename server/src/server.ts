import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import auth from "./routes/auth";

const app = express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT || 9003;

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
