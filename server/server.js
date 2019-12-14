import express from 'express';

const dotenv = require('dotenv');
import 'babel-polyfill';
import fileRoutes from "./api/routes/FileRoutes"
import userRoutes from "./api/routes/UserRoutes";
import folderRoutes from "./api/routes/FolderRoutes";
import shareRoutes from "./api/routes/ShareRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/folders', folderRoutes);
app.use('/files', fileRoutes);
app.use('/shares', shareRoutes);

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});
app.listen(process.env.PORT || 3000);
console.log('app running on port ', 3000);

export default app;