import _ from 'lodash'
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const buildUrlQueryString = (object) => {
  let url = ''
  let keys = Object.keys(object)
  keys.forEach((k, i) => {
    if (object[k] !== '' && object[k] !== undefined && object[k] !== null) {
      url += `${k}=${encodeURIComponent(object[k])}&`
    }
  })
  return `${url.replace(/([&?])$/g, '')}`
}

export const isValidReportName = (value, component) => {
  if (component.marketplaces.amazon_com) {
    return !!value
  }
  return true
}

export const isValidGoogleShoppingReport = (value, component) => {
  if (component.marketplaces.google_shopping) {
    return !!value
  }
  return true
}

export const isValidAmazonCAReport = (value, component) => {
  if (component.marketplaces.amazon_ca) {
    return !!value
  }
  return true
}

export const ucfirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const isAsin = (string = '') => {
  let asinRegex = /^[A-Z0-9]{10}$/
  return string.match(asinRegex) !== null
}

export const isAsinAndNotEmpty = (string) => {
  if (string.length === 0) {
    return true
  }
  let asinRegex = /^[A-Z0-9]{10}$/
  return string.match(asinRegex) !== null
}

export const isUpc = (string) => {
  let upcRegex = /^[0-9]{12}$/
  return string.match(upcRegex) !== null
}

export const isEan = (string) => {
  let eanRegex = /^[0-9]{13}$/
  return string.match(eanRegex) !== null
}

export const isUpcOrEan = (value) => {
  if (!value) {
    return false
  }
  return isUpc(value) || isEan(value)
}

export const getMarketplaceLabelByType = type => {
  return (_.includes(type, 'amazon') ? _.upperFirst(type.replace(/[_]/g, '.')) : type.replace(/[_]/g, ' ').replace(/(\b[a-z](?!\s))/g, x => { return x.toUpperCase() }))
}
