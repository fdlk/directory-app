import React, {Component, PropTypes} from 'react'
import Switch from 'rc-switch'
import 'rc-switch/assets/index.css'

function nextState(state) {
  const result = state === true ? false : ( state === false ? undefined : true )
  return result
}

export const BoolFilter = ({label, value, onChange}) => (<div>
  {label}: <Switch checked={value} onChange={() => onChange(nextState(value))} />
</div>)

export default BoolFilter
