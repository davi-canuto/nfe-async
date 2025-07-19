import { Queue } from 'bullmq'
import { connection } from './bullmq'

export const nfeQueue = new Queue('emit-nfe', { connection })