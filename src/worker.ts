import { Worker } from 'bullmq'
import { processNfe } from './services/nfeService'

new Worker('nfe-async', async (job) => processNfe(job.data))
