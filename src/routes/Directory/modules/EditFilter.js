// Constants
const EDIT_FILTER = 'Directory.EDIT_FILTER'
const SET_ATTRIBUTE = 'Directory.SET_ATTRIBUTE'

export const constants = { EDIT_FILTER, SET_ATTRIBUTE };

// Action Creators
export const editFilter = (attribute, value) => ({
  type: EDIT_FILTER,
  payload: { attribute, value }
})

export const setAttribute = (attribute) => ({
  type: SET_ATTRIBUTE,
  payload: { attribute }
})

export const actions = { editFilter, setAttribute };

// Reducer
export const defaultState = {}

export default function (state = defaultState, action) {

  switch (action.type) {
    case SET_ATTRIBUTE:
        return action.payload
    case EDIT_FILTER:
      return action.payload
    default:
      return state;
  }
}

