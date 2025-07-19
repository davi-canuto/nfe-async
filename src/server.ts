import express, { Request, Response } from "express"
import { schema } from "./graphql/schema"
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
  sendResponseResult
} from "graphql-helix"

const app = express()

app.use(express.json())

app.use("/graphql", async (req: Request, res: Response) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  }

  if (shouldRenderGraphiQL(request)) {
    res.type("text/html").send(renderGraphiQL())
    return
  }

  const { query, variables, operationName } = getGraphQLParameters(request)

  const result = await processRequest({
    schema,
    operationName,
    query,
    variables,
    request
  })

  if (result.type === "RESPONSE") {
    sendResponseResult(result, res)
  }
})

app.listen(8000)