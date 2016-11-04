import { get } from 'redux/modules/MolgenisApi'
import { getRsql } from './Filters'

// ------------------------------------
// Constants
// ------------------------------------
const METADATA_RECEIVED = 'Directory.METADATA_RECEIVED'
const ITEMS_RECEIVED = 'Directory.ITEMS_RECEIVED'

export const constants = { METADATA_RECEIVED, ITEMS_RECEIVED }

// ------------------------------------
// Action Creators
// ------------------------------------
export const metadataReceived = (metadata) => ({
  type    : METADATA_RECEIVED,
  payload : metadata
})

export const dataReceived = (items) => ({
  type    : ITEMS_RECEIVED,
  payload : items
})

// ------------------------------------
// Thunks
// ------------------------------------
export function fetchMetadata (entityName) {
  return function (dispatch, getState) {
    const { server, token } = getState().session
    return get(server, `v2/${entityName}`, token).then((json) => {
      const metadata = json.meta
      dispatch(metadataReceived(metadata))
    })
  }
}

export function fetchData (entityName) {
  return function (dispatch, getState) {
    const { session: { server, token }, Directory: { entities, filters } } = getState()
    const attributes = getAttributes(entities)
    const rSql = getRsql(filters, attributes)

    // TODO if rSql is empty, do not add the q parameter
    let query
    if(rSql === undefined) {
      query = `v2/${entityName}`
    } else {
      query = `v2/${entityName}?q=${rSql}`
    }
    return get(server, query, token).then((json) => {
      const items = json.items
      dispatch(dataReceived(items))
    })
  }
}

export const actions = { metadataReceived, dataReceived, fetchData, fetchMetadata }

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

export function getCollections (state) {
  const collections = state.items.map(function(item, index) {
    return {
      "collectionId" : item.id,
      "biobankId"    : item.biobank === undefined ? "" : item.biobank.id
    }
  })
  return collections
}

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {
  metadata : {},
  items    : []
}

export default function (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

