import axios from 'axios'
import _ from 'lodash'

const API_BASE_URL = process.env.VUE_APP_MW_API_BASE_URL
const DUMMY_TOKEN = process.env.VUE_APP_MW_DEV_ACCESS_TOKEN
export const MW_API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 600000
})

// Declare a Map to store the identification and cancellation functions for each request
const cancellableHolder = new Map()
/**
 * Add Request
 * @param {Object} config
 */
const setupCancellable = (config) => {
  if (config.cancelPreviousCallTicket) {
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
      if (!cancellableHolder.has(config.cancelPreviousCallTicket)) { // If the current request does not exist in pending, add it
        cancellableHolder.set(config.cancelPreviousCallTicket, cancel)
      }
    })
  }
}
/**
 * Remove Request
 * @param {Object} config
 */
const cancelIfExist = (config) => {
  if (cancellableHolder.has(config.cancelPreviousCallTicket)) { // If the current request identity exists in pending, you need to cancel the current request and remove it
    const cancel = cancellableHolder.get(config.cancelPreviousCallTicket)
    cancel(config.cancelPreviousCallTicket)
    cancellableHolder.delete(config.cancelPreviousCallTicket)
  }
}
/**
 * Remove Cancel Label
 * @param {Object} config
 */
const removeCancellableIfExist = (config) => {
  if (cancellableHolder.has(config.cancelPreviousCallTicket)) {
    cancellableHolder.delete(config.cancelPreviousCallTicket)
  }
}

MW_API.interceptors.request.use(function (config) {
  cancelIfExist(config) // Check previous requests to cancel before the request starts
  setupCancellable(config) // Add current request to pending
  let token = null
  if (_.has(config, 'share_token')) {
    token = config.share_token
  } else {
    token = localStorage.getItem('ps_access_token') || DUMMY_TOKEN
  }
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

MW_API.interceptors.response.use(function (response) {
  removeCancellableIfExist(response.config) // Remove this request at the end of the request
  return response
}, function (error) {
  return Promise.reject(error)
})
