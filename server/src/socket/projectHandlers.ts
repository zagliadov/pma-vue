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

export const registerProjectHandlers = async (io: any, socket: any) => {
  await socket.on("project:removeProjectAssignee", (payload: number) => {
    removeProjectAssignee(io, payload);
  });
};
