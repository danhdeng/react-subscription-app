import express from 'express';
import authRouter from './routes/auth';
import subsRouter from './routes/sub';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
var corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
console.log(corsOptions);
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/subs', subsRouter);

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
