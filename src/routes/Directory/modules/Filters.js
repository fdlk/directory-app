// Constants

// export const constants = { };

// Action Creators

// export const actions = { };

// Reducer
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
      return `${attribute.name}==${filter[0]}`
    case 'BOOL':
      return `${attribute.name}==${filter[attribute.name].value}`
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    default:
      return state
  }
}
