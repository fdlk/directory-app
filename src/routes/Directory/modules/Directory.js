import { combineReducers } from 'redux'
import entities, * as fromEntities from './Entities'
import filters, * as fromFilters from './FIlters'

// ------------------------------------
// Selectors
// ------------------------------------
export const getAttributes = (state) => fromEntities.getAttributes(state.entities)
export const getRsql = (state) => fromFilters.getRsql(state.filters, getAttributes(state))

export const reducer = combineReducers({ entities, filters })

export default reducer
