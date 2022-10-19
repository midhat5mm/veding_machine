import express from 'express';
import { connectDB } from './database';
import { errorHandler } from './middleware/errorHandler';
import { productRoute } from './routes/productRoute';
import { userRoute } from './routes/userRoute';

connectDB();

const app = express();
const port = 4000;

app.use(express.json());

app.use('/product', productRoute);
app.use('/user', userRoute);

app.use(errorHandler);

app.use(function(req, res){
  res.status(404).send('Not found');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
