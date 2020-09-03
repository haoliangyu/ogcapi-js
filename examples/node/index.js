require('isomorphic-fetch');

const { Service } = require('@ogcapi-js/features')

async function getCollectionCount (serviceUrl) {
  const service = new Service({ baseUrl: serviceUrl })
  const result = await service.getCollections()

  console.log(`service url: ${serviceUrl}`)
  console.log(`collection count: ${result.collections.length}`)
}

getCollectionCount('https://www.ldproxy.nrw.de/topographie')