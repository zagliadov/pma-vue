import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import auth from "./routes/auth";
import workspace from "./routes/workspace";
import project from "./routes/project";
import assignee from "./routes/assignee";
import user from "./routes/user";

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  createParentPath: true,
}));
const port = process.env.PORT || 9003;

app.use("/auth", auth);
app.use("/workspace", workspace);
app.use("/project", project);
app.use("/assignee", assignee);
app.use("/user", user);

app.use('/controllers/uploads', express.static('./controllers/uploads'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
