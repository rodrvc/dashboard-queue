const express = require('express');
const app = express()
const port = 3000


// const Queue = require('bull');
import { ErrorCode, Queue, UnrecoverableError } from 'bullmq';

// const queue = new Queue('Paint');

// queue.add('cars', { color: 'blue' });
const connection = {
    connection: {
        host: "redis",
        port: 6379
    }
}
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const myQueue = new Queue('foo', connection);

const addJobs = () => {
    myQueue.add('myJobName', { name: 'bar' });
    myQueue.add('myJobName', { name: 'baz' });
    console.log('jobs are    added!')

    console.log({ myQueue })
    console.log("this is es1")
}

addJobs();


import { Worker, Job } from 'bullmq';
import { hostname } from 'os';
import { hasUncaughtExceptionCaptureCallback } from 'process';

const worker = new Worker(
    'foo',
    async (job: Job) => {
        // Do something with job
        if (job.name == "myJobName") {
            await ProcessQueue(job);
        }
        console.log('the job is working right now')

        throw new Error("This error is great");
        
        return 'some value';



    }, connection);


const ProcessQueue = (job: Job) => {
    setTimeout(function (job) {
        console.log(`This job is done! ${job.data.name} is processing `);
        try {
            throw "this is an error!"

        } catch (error) {

        }
    }, 3000, job)
}

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(myQueue)],
    serverAdapter: serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.use('/', function () {
    console.log('yeah')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}20kl`)
})