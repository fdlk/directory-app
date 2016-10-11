import { get } from 'redux/modules/MolgenisApi'

// Constants
const METADATA_RECEIVED = 'METADATA_RECEIVED'

export const constants = { METADATA_RECEIVED }

// Action Creators
export const metadataReceived = (entityMetadata) => ({
  type    : METADATA_RECEIVED,
  payload : entityMetadata
})

export function fetchMetadata (entityName) {
  return function (dispatch, getState) {
    const { server, token } = getState().session
    return get(server, `v2/${entityName}`, token).then((json) => {
      const metadata = json.meta
      dispatch(metadataReceived(metadata))
    })
  }
}

export const actions = { metadataReceived, fetchMetadata }

// Reducer
export const defaultState = {
  entityMetadata : { }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case METADATA_RECEIVED:
      return {
        ...state,
        entityMetadata : {
          ...state.entityMetadata,
          [action.payload.name] : action.payload
        }
      }
    default:
      return state
  }
}
