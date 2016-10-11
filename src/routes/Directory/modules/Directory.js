import { combineReducers } from 'redux'
import entities from './Entities'

// ------------------------------------
// Selectors
// ------------------------------------
// TODO
// export const getSelectedPhenotypes = (state) => fromPhenotypes.getSelectedPhenotypes(state.phenotypes)

export const reducer = combineReducers({ entities })

export default reducer
