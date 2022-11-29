import { Job } from "bullmq"
import { connection } from "../../config/connection";


export const ProcessQueue = async (job: Job, str: string) => {

    return new Promise(resolve => {
        setTimeout(function () {
            resolve(console.log(`job finished! ${job.name} and was done`))
        }, 6000)
    })
}


import { Worker } from 'bullmq';


// import { setTimeout } from 'timers/promises';
const concurrency = { concurrency: 10 };
const fakeRequest = () => {
    setTimeout(function () {
        console.log('se logo');
    }, 1000);
};
const funcx = async (job: Job) => {
    console.log("worker 1");
    console.log(`the job is working right now ${job.name}`);
    return await ProcessQueue(job, job.name);
};
const funcx2 = async (job: Job) => {
    console.log("worker 2");
    console.log(`the job is working right now ${job.name}`);
    return await ProcessQueue(job, job.name);

    // throw new Error("This error is great");
    console.log('the execution continues!');
    job.updateProgress(80);
    return await "done";
};


const worker = new Worker(

    'parent', funcx,
    {
        concurrency: 1,
        connection:   connection.connection,
        metrics: {
            maxDataPoints: 3
        },
    }
);


const worker2 = new Worker(
    'parent', funcx2,
    {
        concurrency: 1,
        connection:   connection.connection,
        metrics: {
            maxDataPoints: 3
        },
    }
);



