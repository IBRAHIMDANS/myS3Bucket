import { Request } from 'express';
import { User } from '../entity/User';

export interface RequestCustom extends Request {
    user: User;
    file: Express.Multer.File;
    files:
        | {
              [fieldname: string]: Express.Multer.File[];
          }
        | Express.Multer.File[];
}
