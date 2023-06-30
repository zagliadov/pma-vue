import express from 'express';
import prisma from './db';

const app = express();
const port = 9002;

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
