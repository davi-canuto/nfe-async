import request from 'supertest'
import express from 'express'
import { schema } from '../src/graphql/schema'
import { getGraphQLParameters, processRequest, sendResponseResult } from 'graphql-helix'
import { nfeQueue } from '../src/queues/nfeQueue'
import { Worker } from 'bullmq'
import { connection } from '../src/queues/connection'

let app: express.Express
let server: any
let worker: Worker

beforeAll(async () => {
  app = express()
  app.use(express.json())
  app.use('/graphql', async (req, res) => {
    const requestObj = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query
    }

    const { query, variables, operationName } = getGraphQLParameters(requestObj)

    const result = await processRequest({
      schema,
      operationName,
      query,
      variables,
      request: requestObj
    })

    if (result.type === 'RESPONSE') {
      sendResponseResult(result, res)
    }
  })

  server = app.listen(8000)
  worker = new Worker('nfe-async', async () => { }, { connection })
})

afterAll(async () => {
  await worker.close()
  await server.close()
  await nfeQueue.close()
})

beforeEach(async () => {
  await nfeQueue.drain()
})

describe('enqueueNfe mutation', () => {
  it('returns a valid jobId', async () => {
    const query = `mutation($cnpj: String!, $value: Float!){ enqueueNfe(cnpj:$cnpj, value:$value) }`
    const variables = { cnpj: '12345678000100', value: 200.5 }
    const res = await request(app).post('/graphql').send({ query, variables })

    expect(res.status).toBe(200)
    const jobId = res.body.data.enqueueNfe

    expect(jobId).toBeDefined()
    const job = await nfeQueue.getJob(jobId)
    
    expect(job).not.toBeNull()
  })
})