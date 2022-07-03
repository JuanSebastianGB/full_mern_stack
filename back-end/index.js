import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(cors('*'));
app.use(morgan('dev'));
app.use('/posts', postRoutes);
app.use('/users', usersRoutes);
dotenv.config();

const CONNECTION_URL =
  process.env.CONNECTION_URL || 'mongodb://localhost:27017/posts';

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running o port ${PORT}`));
  })
  .catch(err => console.log(err.message));
