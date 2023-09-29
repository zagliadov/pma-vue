export const socketHandler = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("removeProjectAssignee", async (id: number) => {
      try {
        console.log(id);
        io.emit("removeProjectAssignee", id);
      } catch (error) {
        console.error("Error removing assignee:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};