import { Queue } from 'bullmq';
import { connection } from '../../config/connection';


const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const mainQueue = new Queue('parent', connection);
const queueNode1 = new Queue('Node 1', connection);
const queueNode2 = new Queue('Node 2', connection);




const addJobs = async () => {
    mainQueue.add('banco_estado1', { name: 'bar' },)
    mainQueue.add('banco_estado2', { name: 'baz' },)
    mainQueue.add('banco_estado3', { name: 'bar' },)
    mainQueue.add('banco_estado4', { name: 'baz' },)
    mainQueue.add('banco_estado5', { name: 'bar' });
    mainQueue.add('banco_estado6', { name: 'baz' });
    mainQueue.add('banco_estado7', { name: 'baz' });
    mainQueue.add('banco_estado8', { name: 'baz' });
    console.log('jobs are    added!')
    console.log("this is es1")
    console.log(`Main queue has an total of ${await mainQueue.getJobCounts()}`)
    console.log(await mainQueue.getJobCounts().then(a => console.log(`this is1 ${a.active}`)))
}

addJobs();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [
        new BullMQAdapter(mainQueue),
        new BullMQAdapter(queueNode1),
        new BullMQAdapter(queueNode2)],
    serverAdapter: serverAdapter,
});


export const adapter =  serverAdapter.getRouter()
