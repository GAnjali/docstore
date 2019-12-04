import express from 'express';

const dotenv = require('dotenv');
import 'babel-polyfill';
import fileRoutes from "./api/routes/FileRoutes"

dotenv.config();

const app = express();
app.use(express.json());

app.use('/files', fileRoutes);

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});
app.listen(process.env.PORT || 3000);
console.log('app running on port ', 3000);

export default app;