import { nfeQueue } from "../services/bullmq"
import { NFeInput } from "../types/nfe"

export const resolvers = {
  Query: {
    jobStatus: async (_: any, { jobId }: { jobId: string }) => {
      const job = await nfeQueue.getJob(jobId)
      if (!job) return "NOT_FOUND"
      return await job.getState()
    }
  },
  Mutation: {
    enqueueNFe: async (_: any, args: any) => {
      const job = await nfeQueue.add('emit-nfe', args.input)
      return job.id
    }
  }
}
