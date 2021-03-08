function buildTitle(title) {
  return JSON.stringify({
    name: "title",
    type: "match",
    value: title
  })
}

function buildQuery(queryPayload) {
  let arr = [];

  for (let key in queryPayload) {
    if (queryPayload[key]) {
      arr.push(queryPayload[key]);
    }
  }

  return JSON.stringify(arr);
}

module.exports = {
  buildTitle,
  buildQuery
}
