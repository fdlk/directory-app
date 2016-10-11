import { get } from 'redux/modules/MolgenisApi'

// ------------------------------------
// Constants
// ------------------------------------
const METADATA_RECEIVED = 'METADATA_RECEIVED'

export const constants = { METADATA_RECEIVED }

// ------------------------------------
// Action Creators
// ------------------------------------
export const metadataReceived = (entityMetadata) => ({
  type    : METADATA_RECEIVED,
  payload : entityMetadata
})

export const actions = { metadataReceived, fetchMetadata }

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

// export function fetchEntities (entityName) {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [METADATA_RECEIVED] : (state, action) => ({
    ...state,
    entityMetadata : {
      ...state.entityMetadata,
      [action.payload.name] : action.payload
    }
  })
}

// ------------------------------------
// Selectors
// ------------------------------------
export function getAttributes (state) {
  const collection = state.entityMetadata.eu_bbmri_eric_collections
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
  entityMetadata : { }
}

export default function (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

