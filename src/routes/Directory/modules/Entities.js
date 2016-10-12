import { get } from 'redux/modules/MolgenisApi'

// ------------------------------------
// Constants
// ------------------------------------
const METADATA_RECEIVED = 'Directory.METADATA_RECEIVED'
const ITEMS_RECEIVED    = 'Directory.ITEMS_RECEIVED'

export const constants = { METADATA_RECEIVED, ITEMS_RECEIVED }

// ------------------------------------
// Action Creators
// ------------------------------------
export const metadataReceived = (metadata) => ({
  type    : METADATA_RECEIVED,
  payload : metadata
})

export const itemsReceived = (items) => ({
  type    : ITEMS_RECEIVED,
  payload : items
})

// ------------------------------------
// Thunks
// ------------------------------------
export function fetchData (entityName) {
  return function (dispatch, getState) {
    const { server, token } = getState().session
    return get(server, `v2/${entityName}`, token).then((json) => {
      const metadata = json.meta
      const items = json.items
      dispatch(metadataReceived(metadata))
      dispatch(itemsReceived(items))
    })
  }
}

export function fetchItems (entityName, rSql) {
  return function (dispatch, getState) {
    const { server, token } = getState().session
    return get(server, `v2/${entityName}?q=${rSql}`, token).then((json) => {
      const items = json.items
      dispatch(itemsReceived(items))
    })
  }
}

export const actions = { metadataReceived, fetchData, itemsReceived, fetchItems }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [METADATA_RECEIVED] : (state, action) => ({
    ...state,
    metadata : {
      ...state.metadata,
      [action.payload.name] : action.payload
    }
  }),
  [ITEMS_RECEIVED] : (state, action) => ({
      ...state,
      items : action.payload
  })
}

// ------------------------------------
// Selectors
// ------------------------------------
export function getAttributes (state) {
  const collection = state.metadata.eu_bbmri_eric_collections
  return collection && collection.attributes.reduce(addAttribute, [])
}

function addAttribute (soFar, attribute) {
  return attribute.fieldType === 'COMPOUND'
    ? attribute.attributes.reduce(addAttribute, soFar)
    : [...soFar, attribute]
}

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {
  metadata    : {},
  items       : {}
}

export default function (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

