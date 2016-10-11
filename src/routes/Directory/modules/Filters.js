// ------------------------------------
// Constants
// ------------------------------------
export const REMOVE_FILTER = 'Directory.REMOVE_FILTER'
export const SET_FILTER = 'Directory.SET_FILTER'

export const constants = { REMOVE_FILTER, SET_FILTER }

// ------------------------------------
// Action Creators
// ------------------------------------
export function removeFilter (attributeName) {
  return {
    type    : REMOVE_FILTER,
    payload : attributeName
  }
}

export function setFilter (attributeName, filter) {
  return {
    type    : SET_FILTER,
    payload : { attributeName, filter }
  }
}

export const actions = { removeFilter, setFilter }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_FILTER] : (state, action) => {
    const { attributeName, filter } = action.payload
    return {
      ...state,
      [attributeName] : filter
    }
  },
  [REMOVE_FILTER] : (state, action) => {
    const attributeName = action.payload
    const { [attributeName] : deleted, ...newState } = state
    return newState
  }
}

// ------------------------------------
// Thunks
// ------------------------------------
// TODO remove filter will trigger data fetch -> remove filter is thunk
// export function updateEntities() {
//
// }

// ------------------------------------
// Selectors
// ------------------------------------
export function getRsql (state, attributes) {
  attributes
    .filter(attribute => state.hasOwnProperty(attribute.name))
    .map(attribute => {
      const filter = state[attribute.name]
      return getRsql(attribute, filter)
    })
    .join(';')
}

export function getRsqlFragment (attribute, filter) {
  switch (attribute.fieldType) {
    case 'CATEGORICAL_MREF':
    case 'MREF':
      return filter[attribute.name]
        .map(line => getComplexFilterLineRsqlFragment(attribute.name, line))
        .join('')
    case 'BOOL':
      const value = filter[attribute.name]
      return `${attribute.name}==${value}`
  }
}

export function getComplexFilterLineRsqlFragment (name, line) {
  if (line === 'OR') {
    return ','
  }
  if (line === 'AND') {
    return ';'
  }
  const { operator } = line
  var value = line.value
  if (operator) {
    value = value.join(operator === 'AND' ? ';' : ',')
  }
  return `${name}==${value}`
}

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {
  materials : [
    {
      operator : 'AND',
      value    : ['PLASMA', 'TISSUE_FROZEN']
    },
    'OR',
    {
      value : 'NAV'
    }
  ],
  sample_access_fee : true
}

export default function (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
