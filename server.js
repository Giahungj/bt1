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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT
app.use(express.static(path.join(__dirname, 'public')))
viewEngine(app)

app.use('/', mainRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})