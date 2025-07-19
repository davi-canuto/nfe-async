import { Worker } from 'bullmq'
import { connection } from './queues/bullmq'
import { processNFe } from './services/nfeService'

new Worker('emit-nfe', async (job) => processNFe(job.data), { connection })