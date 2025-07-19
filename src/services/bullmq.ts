import { Queue, RedisOptions } from 'bullmq'

const redisConfig: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
}

const nfeQueue = new Queue('emit-nfe', { connection: redisConfig })

export { redisConfig, nfeQueue }