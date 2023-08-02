import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import workspace from "./routes/workspace";
import project from "./routes/project";
import assignee from "./routes/assignee";

const app = express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT || 9003;

app.use("/auth", auth);
app.use("/workspace", workspace);
app.use("/project", project);
app.use("/assignee", assignee);

app.use('/controllers/uploads', express.static('./controllers/uploads'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
