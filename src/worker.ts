import { Worker } from 'bullmq'
import { redisConfig } from './services/bullmq'
import { processNFe } from './services/nfe'

new Worker('emit-nfe', async (job) => processNFe(job.data), { connection: redisConfig })