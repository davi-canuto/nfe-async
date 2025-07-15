import { Queue } from 'bullmq'
import { connection } from './connection'

export const nfeQueue = new Queue('nfe-async', { connection })