
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
// Thunks
// ------------------------------------
// TODO remove filter will trigger data fetch -> remove filter is thunk
// export function updateEntities() {
//
// }

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
// Selectors
// ------------------------------------
export function getRsql (state, attributes) {
  return attributes && attributes
    .filter(attribute => state.hasOwnProperty(attribute.name))
    .map(attribute => {
      const filter = state[attribute.name]
      return getRsqlFragment(attribute, filter)
    })
    .join(';')
}

export function getRsqlFragment (attribute, filter) {
  switch (attribute.fieldType) {
    case 'CATEGORICAL_MREF':
    case 'MREF':
      return filter
        .map(line => getComplexFilterLineRsqlFragment(attribute.name, line))
        .join('')
    case 'BOOL':
      return `${attribute.name}==${filter}`
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
    return value.map(v => `${name}==${v.id}`).join(operator === 'AND' ? ';' : ',')
  }
  return `${name}==${value.id}`
}

export function getHumanReadable (state, attributes) {
  return attributes && attributes
      .filter(attribute => state.hasOwnProperty(attribute.name))
      .map(attribute => {
        const filter = state[attribute.name]
        return getHumanReadableFragment(attribute, filter)
      })
      .join('\n')
}

export function getHumanReadableFragment (attribute, filter) {
  switch (attribute.fieldType) {
    case 'CATEGORICAL_MREF':
    case 'MREF':
      return filter
        .map(line => getComplexFilterLineHumanReadableFragment(attribute.label, line))
        .join('')
    case 'BOOL':
      return filter ? attribute.label + ' is required' : attribute.label + ' is not required'
  }
}

export function getComplexFilterLineHumanReadableFragment (label, line) {
  if (line === 'OR') {
    return ' or '
  }
  if (line === 'AND') {
    return ' and '
  }
  const { operator } = line
  var value = line.value
  if (operator) {
    value = value.map(v => v.label).join(operator === 'AND' ? ' and ' : ' or ')
  } else {
    value = value.label
  }
  return `${label} is ${value}`
}

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {
  materials : [
    {
      operator : 'AND',
      value    : [{
        id    : 'PLASMA', label : 'Plasma'
      }, {
        id    : 'TISSUE_FROZEN', label : 'Cryo tissue'
      }]
    },
    'OR',
    {
      value : { id : 'NAV', label : 'Not available' }
    }
  ],
  sample_access_fee : true
}

export default function (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
