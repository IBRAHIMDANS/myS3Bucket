import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
// https://medium.com/javascript-in-plain-english/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.headers['auth'];
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request

    const { email, nickname } = jwtPayload;
    const newToken = jwt.sign({ email, nickname }, config.jwtSecret, {
        expiresIn: '1h',
    });
    res.setHeader('token', newToken);

    //Call the next middleware or controller
    next();
};
