import fetch from 'isomorphic-fetch'

import { combineReducers } from 'redux'
import entities, * as fromEntities from './Entities'
import filters, * as fromFilters from './Filters'

// ------------------------------------
// Selectors
// ------------------------------------
export const getAttributes = (state) => fromEntities.getAttributes(state.entities)
export const getCollections = (state) => fromEntities.getCollections(state.entities)
export const getRsql = (state) => state && state.filters && state.entities &&
  fromFilters.getRsql(state.filters, getAttributes(state))

export const getHumanReadable = (state) => state && state.filters && state.entities &&
  fromFilters.getHumanReadable(state.filters, getAttributes(state))

export function getQueryPayload (state) {
  const URL = 'https://molgenis52.gcc.rug.nl/api/v2/eu_bbmri_eric_collections?q=' + getRsql(state)
  const humanReadable = getHumanReadable(state)
  const collections = getCollections(state)
  const nToken = state.nToken
  return { URL, humanReadable, collections, nToken }
}

export const doNegotiate = (queryPayload) => {
  return function(dispatch, getState) {
    const headers = new Headers({
      'Content-Type' : 'application/json'
    })

    const { baseUrl } = getState()
    fetch(baseUrl + '/menu/main/bbmridirectory/query', {
      method      : 'POST',
      headers     : headers,
      mode        : 'same-origin',
      credentials : 'same-origin',
      body        : JSON.stringify(queryPayload)
    }).then(function(response){
      response.text().then(function(text){
        alert(text)
        window.location = text
      })
    })
  }
}

export const reducer = combineReducers({ entities, filters }, { })

export default reducer
