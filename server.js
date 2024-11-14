import express from 'express';
import dotenv from 'dotenv/config';
import session from 'express-session'
import path from 'path';
import viewEngine from './viewEngine';
import mainRoutes from './routes/mainRoute';
import { connect } from './connect'

const app = express();

connect()
.then(connection => {
    console.log("Server đã kết nối thành công đến DB")
})
.catch(error => {
    console.error("Không thể kết nối đến DB:", error)
    process.exit(1)
})

app.use(session({
    secret: '4e3a4c94b924b86a737fbb03e75df7e892efb7edc45c3a8e0ef275c9fa8b12ffb51f3a6db2c88231cbf89f9da7a9d0e7b8bb6624f3f5a8b3b93f9575f6b1d1c8',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT
app.use(express.static(path.join(__dirname, 'public')))
viewEngine(app)

app.use('/', mainRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})