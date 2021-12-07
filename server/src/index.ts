import express from 'express';
import authRouter from './routes/auth';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => res.send('Hello World!!!!!!'));

console.log(process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`the server is litsening on port : ${process.env.PORT}`);
});
