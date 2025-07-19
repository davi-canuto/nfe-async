import { nfeQueue } from "../services/bullmq"

export const resolvers = {
  Query: {
    jobStatus: async (_: any, { jobId }: { jobId: string }) => {
      const job = await nfeQueue.getJob(jobId)
      if (!job) return "NOT_FOUND"
      return await job.getState()
    }
  },
  Mutation: {
    enqueueNFe: async (_: any, { cnpj, value }: { cnpj: string, value: number }) => {
      const job = await nfeQueue.add('emit-nfe', { cnpj, value })
      return job.id
    }
  }
}
