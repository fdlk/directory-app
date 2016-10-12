import { combineReducers } from 'redux'
import entities, * as fromEntities from './Entities'
import filters, * as fromFilters from './Filters'

// ------------------------------------
// Selectors
// ------------------------------------
export const getAttributes = (state) => fromEntities.getAttributes(state.entities)
export const getRsql = (state) => state && state.filters && state.entities &&
  fromFilters.getRsql(state.filters, getAttributes(state))
export const getHumanReadable = (state) => state && state.filters && state.entities &&
  fromFilters.getHumanReadable(state.filters, getAttributes(state))
export function getQueryPayload(state) {
  const url = 'https://molgenis52.gcc.rug.nl/api/v2/eu_bbmri_eric_collections?q=' + getRsql(state)
  const humanReadable = getHumanReadable(state)
  const collections = [] //TODO: mark!! fromEntities.getCollections(state.entities)
  return { url, humanReadable, collections }
}

export const reducer = combineReducers({ entities, filters })

export default reducer
