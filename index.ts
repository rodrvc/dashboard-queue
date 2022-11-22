const express = require('express');
const app = express()
const port = 3000


// const Queue = require('bull');
import { ErrorCode, Queue, RedisConnection, UnrecoverableError, WORKER_SUFFIX } from 'bullmq';

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

const myQueue1 = new Queue('nodo 1', connection);
const myQueue2 = new Queue('Node 2', connection);

const addJobs = () => {
    myQueue1.add('banco_estado1', { name: 'bar' });
    myQueue1.add('banco_estado2', { name: 'baz' });
    myQueue1.add('banco_estado3', { name: 'bar' });
    myQueue1.add('banco_estado4', { name: 'baz' });
    myQueue1.add('banco_estado5', { name: 'bar' });
    myQueue1.add('banco_estado6', { name: 'baz' });


    console.log('jobs are    added!')
    console.log("this is es1")
}

addJobs();


import { Worker, Job } from 'bullmq';
const concurrency = { concurrency: 10 }

const fakeRequest = () => {
    setTimeout(function(){
        console.log('se logo')
    }, 1000);
}

const funcx = async (job: Job) => {
    // Do something with job
    // if (job.name == "myJobName") {
    //     await ProcessQueue(job);
    // }
    console.log(`the job is working right now ${job.name}`)
    await ProcessQueue(job);
    // throw new Error("This error is great");
    console.log('the execution continues!');
    job.updateProgress(80)
    return await fetch('www.google.cl');
}

const worker = new Worker(
    'nodo 1', funcx
    , {
        concurrency: 1,
        connection: {
            port: 6379,
            host: 'redis'
        }, 
        metrics: {
            maxDataPoints: 3
          },
    },
);



const ProcessQueue = async (job: Job) => {
    await setTimeout(function (job) {
        console.log(`This job is done! ${job.data.name} is processing `);
        try {
            console.log(`Crawler could not get transfers ${job.name}`)
            throw new Error("Crawler could not get transfers")
        } catch (error) {

        }
    }, 10000, job)
}

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullMQAdapter(myQueue1), new BullMQAdapter(myQueue2)],
    serverAdapter: serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.use('/', function () {
    console.log('yeah')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}20kl`)
})