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

export const reducer = combineReducers({ entities, filters })

export default reducer
