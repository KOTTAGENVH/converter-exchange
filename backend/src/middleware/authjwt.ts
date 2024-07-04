import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import User from '../user/model/user';

interface CustomRequestVerify extends Request {
    userId?: string;
}

interface JwtPayload {
    id: string;
    email: string;
  }

export const verifyToken = async (req: CustomRequestVerify, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    const refreshToken = req.headers.refreshtoken as string;
    var { email } = req.body;
    if (!authHeader) {
         res.status(403).json({ message: "No token provided" });
         return;
    }

    const token = authHeader.split('.')[1];
    try {
        const decoded = jwt.verify(authHeader, process.env.secret) as JwtPayload;
        req.userId = decoded.id;
        req.userId = decoded.id;
       if(email != decoded.email){
        res.status(401).json({ message: "Unauthorized" });
        return;
       }
        console.log('req.userId:', req.body.email);
        console.log('decoded:', decoded);
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            if (!refreshToken) {
              res.status(403).json({ message: "No refresh token provided" });
                return;
            }

            try {
                const decodedRefresh = jwt.verify(refreshToken, process.env.refreshtoken) as { id: string };

                const user = await User.findById(decodedRefresh.id);
                if (!user || user.refreshtoken !== refreshToken) {
                     res.status(403).json({ message: "Invalid refresh token" });
                     return;
                }

                // Generate new access token
                const newAccessToken = jwt.sign({ email: user.email, id: user._id }, process.env.secret, { expiresIn: '1h' });
                req.userId = decodedRefresh.id;
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                next();
            } catch (refreshError) {
                 res.status(401).json({ message: "Unauthorized" });
                 return;
            }
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.error('Error verifying token:', (error as Error).message);
             res.status(401).json({ message: 'Invalid token' });
                return;
        }
         res.status(401).json({ message: 'Unauthorized' });
         return null;
    }
};
