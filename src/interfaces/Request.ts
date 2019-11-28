import { Request } from 'express';
import { User } from '../entity/User';

export interface RequestCustom extends Request {
    user: User;
}
