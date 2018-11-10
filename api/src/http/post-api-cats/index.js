let arc = require('@architect/functions')
let data = require('@architect/data')
let url = arc.http.helpers.url

exports.handler = async function http(req) {
  let cat = Object.assign(req.body, {catID:''+Date.now()})
  await data.cats.put(cat)
  return {
    status: 201,
    location: url(`/api/cats/${cat.catID}`),
    body: '{}'
  }
}

