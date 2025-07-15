import { Worker } from 'bullmq'
import { connection } from './queues/connection'

new Worker('nfe-async', async job => {
  console.log(`Processing job`, job.data)
}, { connection })