import { Operation, SignifyClient } from "signify-ts"

export async function waitAndGetDoneOp(
  client: SignifyClient,
  op: Operation,
  timeout = 10000,
  interval = 250
): Promise<Operation> {
  const startTime = new Date().getTime()
  while (!op.done && new Date().getTime() < startTime + timeout) {
    op = await client.operations().get(op.name)
    await new Promise((resolve) => setTimeout(resolve, interval))
  }
  if (!op.done) {
    throw new Error(`Operation not completing: ${JSON.stringify(op, null, 2)}`)
  }
  return op
}

export async function waitOperation<T = any>(
  client: SignifyClient,
  op: Operation<T> | string,
  signal?: AbortSignal
): Promise<Operation<T>> {
  if (typeof op === "string") {
    op = await client.operations().get(op)
  }
  // const abortController = new AbortController()
  // const id = setTimeout(() => abortController.abort(), 30000)

  op = await client.operations().wait(op, {})
  // clearTimeout(id)
  await deleteOperations(client, op)

  return op
}

async function deleteOperations<T = any>(
  client: SignifyClient,
  op: Operation<T>
) {
  if (op.metadata?.depends) {
    await deleteOperations(client, op.metadata.depends)
  }

  await client.operations().delete(op.name)
}

export async function resolveOobi(
  client: SignifyClient,
  oobi: string,
  alias?: string
) {
  const op = await client.oobis().resolve(oobi, alias)
  await waitOperation(client, op)
}

export async function assertOperations(
  ...clients: SignifyClient[]
): Promise<void> {
  for (const client of clients) {
    const operations = await client.operations().list()
    console.log(`${client} check operations`, operations.length === 0)
  }
}
