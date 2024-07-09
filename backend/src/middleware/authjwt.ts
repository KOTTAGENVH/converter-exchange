import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
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
    const authHeader = req.headers.authorization as string;
    const refreshToken = req.headers.refreshtoken as string;
    const { email } = req.body;
    
    if (!authHeader) {
        res.status(403).json({ message: "No token provided" });
        return;
    }

    try {
        // Extract token from "Bearer <token>" format
        const token = authHeader.split(' ')[1];
        
        // Verify access token
        const decoded = jwt.verify(token, process.env.secret) as JwtPayload;

        // Validate email
        if (email !== decoded.email) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Attach user ID to request for further middleware
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            // Handle expired token scenario
            if (!refreshToken) {
                res.status(403).json({ message: "No refresh token provided" });
                return;
            }

            try {
                // Verify refresh token
                const decodedRefresh = jwt.verify(refreshToken, process.env.refreshtoken) as { id: string };

                // Check if refresh token matches user's stored refresh token
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
        } else if (error instanceof JsonWebTokenError) {
            // Handle other JWT errors
            console.error('Error verifying token:', (error as Error).message);
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        // Default unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const verifyTokenByHeader = async (req: CustomRequestVerify, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization as string;
    const refreshToken = req.headers.refreshtoken as string;
    const email = req.headers.email as string;
   
    if (!authHeader) {
        res.status(403).json({ message: "No token provided" });
        return;
    }

    try {
        // Extract token from "Bearer <token>" format
        const token = authHeader.split(' ')[1];
        
        // Verify access token
        const decoded = jwt.verify(token, process.env.secret) as JwtPayload;

        // Validate email
        if (email !== decoded.email) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Attach user ID to request for further middleware
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            // Handle expired token scenario
            if (!refreshToken) {
                res.status(403).json({ message: "No refresh token provided" });
                return;
            }

            try {
                // Verify refresh token
                const decodedRefresh = jwt.verify(refreshToken, process.env.refreshtoken) as { id: string };

                // Check if refresh token matches user's stored refresh token
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
        } else if (error instanceof JsonWebTokenError) {
            // Handle other JWT errors
            console.error('Error verifying token:', (error as Error).message);
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        // Default unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
    }
};
