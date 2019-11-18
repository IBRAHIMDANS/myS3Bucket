import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const app: express.Express = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        projettName: 'myS3',
        author: ['Ibrahima Dansoko', 'Benjamin Benoit'],
    });
});
const server: any = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default server;
