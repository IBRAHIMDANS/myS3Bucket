import express from 'express';
import { config } from 'dotenv';

config();
const app: express.Express = express();
const port = process.env.PORT || 8080;

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        'project Name': 'myS3',
        author: ['Ibrahima Dansoko', 'Benjamin Benoit'],
    });
});
const server: any = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default server;
