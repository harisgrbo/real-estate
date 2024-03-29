function buildQuery(queryPayload) {
  let arr = [];

  for (let key in queryPayload) {
    if (queryPayload[key]) {
      arr.push(queryPayload[key]);
    }
  }

  if (arr.length === 0) return '';

  return JSON.stringify(arr);
}

function buildTitle(title) {
  return JSON.stringify({
    name: "title",
    type: "match",
    value: title
  })
}

function buildType(type) {
  return JSON.stringify({
    name: "listing_type_id",
    type: "terms",
    value: [type.id]
  })
}

function buildCategory(category) {
  return JSON.stringify({
    name: "category_id",
    type: "term",
    value: category.id
  })
}

function buildCity(city) {
  return JSON.stringify({
    name: "city_id",
    type: "terms",
    value: [city.id]
  })
}

function buildPrice(from, to) {
  return JSON.stringify({
    name: "price",
    type: "range",
    value: [from, to]
  })
}

function buildSquare(from, to) {
  return JSON.stringify({
    name: "1",
    type: "range",
    value: [from, to]
  })
}

module.exports = {
  buildTitle,
  buildType,
  buildCity,
  buildCategory,
  buildPrice,
  buildQuery,
  buildSquare
}
