import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';
import studioRoutes from './routes/studio.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js';
import reviewRoutes from './routes/review.routes.js'


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
app.use('/api/v1/studios', studioRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use('/api/v1', miscRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// agar user koi random url dena chahta hai to
app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found')
});

// generic error 

app.use(errorMiddleware); // user controller madhe je next aahe

export default app;