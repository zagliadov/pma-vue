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
import task from "./routes/task";
import http from "http";
import { Server } from "socket.io";
import { registerProjectHandlers } from "./socket/projectHandlers";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  },
});
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
const port = process.env.PORT || 9003;

app.use("/auth", auth);
app.use("/workspace", workspace);
app.use("/project", project);
app.use("/assignee", assignee);
app.use("/user", user);
app.use("/task", task);

const onConnection = (socket: any) => {
  registerProjectHandlers(io, socket);
};
io.on("connection", onConnection);

app.use("/controllers/uploads", express.static("./controllers/uploads"));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
