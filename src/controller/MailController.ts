import * as nodemailler from 'nodemailer';
import { User } from '../entity/User';

export async function sendMailForRegister(user: User) {
    // const account = await nodemailler.createTestAccount();
    return nodemailler
        .createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        })
        .sendMail({
            from: user.email,
            to: process.env.MAILTRAP_EMAIL,
            subject: 'Bienvenue',
            text: 'Mys3',
            html: `<p> Hello ${user.nickname} bienvenue sur myS3</p>`,
        })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
