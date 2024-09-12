import express from 'express';
import dotenv from 'dotenv/config';
import viewEngine from './viewEngine';

const app = express();
const port = process.env.PORT
viewEngine(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})