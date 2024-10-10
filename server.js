import express from 'express';
import dotenv from 'dotenv/config';
import viewEngine from './viewEngine';
import mainRoutes from './routes/mainRoute';

const app = express();
const port = process.env.PORT
viewEngine(app);

app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})