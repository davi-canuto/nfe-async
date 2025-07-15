import { Worker } from 'bullmq'
import { connection } from './queues/connection'

const worker = new Worker('nfe-async', async (job) => {
  console.log(`processing NF-e for ${job.data.cnpj}, in value of R$${job.data.valor}`)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  console.log(`NF-e processed wih success for job ${job.id}`)

  return { status: "authorized" }
}, { connection })

worker.on('completed', (job) => {
  console.log(`Job ${job.id} finished`)
})

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`)
})
