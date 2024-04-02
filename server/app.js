import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';
// import paymentRoutes from './routes/payment.routes.js'


config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use(cors ({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(cookieParser());

app.use(morgan('dev')) // ERROR_404 ye basically agar kisine ne website ke upar kuch randomly access karna chaha to ye console me message throw karega.

app.use('/ping', function(req, res){
    res.send('Pong')
}) // server up hai ya nahi ye check karne ke liye

// routes of 3 modules
app.use('/api/v1/user', userRoutes)
// app.use('/api/v1/payments', paymentRoutes)

// agar user koi random url dena chahta hai to
app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found')
});

// generic error 

app.use(errorMiddleware); // user controller madhe je next aahe

export default app;