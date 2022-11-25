import express, { Express, Request, Response } from 'express';
import { adapter } from './src/Services/Queue';

const app: Express = express()
const port = 3000
// const Queue = require('bull');

app.use('/admin/queues', adapter);

app.get('/', function (req: Request, res: Response) {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}20kl`)
})