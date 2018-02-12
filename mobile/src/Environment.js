
import {
    Environment,
    Network,
    RecordSource,
    Store,
  } from 'relay-runtime'

  const network = Network.create((operation, variables) => {
    return fetch('https://api.graph.cool/relay/v1/cjdhywzgk0s5t0129y4jpjkga', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json()
    })
  })

  const store = new Store(new RecordSource())

  const environment = new Environment({
    network,
    store,
  })

  export default environment