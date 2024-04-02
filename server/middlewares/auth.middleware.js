import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;  // ye mein kyu kar pa raha hu kyoki app.js mein cookieparser declare kar rakha hai 

    if(!token) {
        return next(new AppError('Unauthenticated, please login again', 400))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    if (!userDetails) {
        return next(new AppError("Unauthorized, please login to continue", 401));
      }
    

    req.user = userDetails;

    next();

}

// list of roles
const authorizedRoles = (...roles) => async (req, res, next) => {

    const currentUserRole = req.user.role;

    if(!roles.includes(currentUserRole)){
        return next(
            new AppError('You do not have permission to access this route', 403)
        )
    }
    next();
}

const authorizeSubscriber = async (req, res, next) => {
    const subscription = req.user.subscription;

    if(currentUserRole !== 'ADMIN' && subscription.status !== 'active') {
        return next(
            new AppError('Please Subscribe to access this route!', 403)
        )
    }
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber
}