const express = require('express');
const app = express()
const port = 3000


const Queue = require('bull');
const QueueMQ = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const myQueue = new Queue('foo' ,  {
    redis: { port: 6379, host: '127.0.0.1', password: '' }});

const addJobs = () => {
     myQueue.add('myJobName', { foo: 'bar' });
     myQueue.add('myJobName', { qux: 'baz' });
    console.log('jobs are added!')
}

addJobs();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(myQueue)],
    serverAdapter: serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})