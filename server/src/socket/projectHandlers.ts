import prisma from "../db";


export const removeProjectAssignee = async (io: any, payload: number) => {
  try {
    await prisma.$connect()
    await io.emit("project:removeProjectAssignee", payload);
  } catch (error) {
   console.log(error); 
  } finally {
    await prisma.$disconnect();
  }
};

export const registerProjectHandlers = (io: any, socket: any) => {
  socket.on("project:removeProjectAssignee", (payload: number) => {
    removeProjectAssignee(io, payload);
  });
};
