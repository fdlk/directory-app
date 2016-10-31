import React, {Component, PropTypes} from 'react'
import CategoryFilter from './CategoryFilter'

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  nullable: PropTypes.bool
}

const options = [{
  label: 'True',
  value: true
}, {
  label: 'False',
  value: false
}]

export const BoolFilter = ({label, values, onChange, nullable}) => (<CategoryFilter
  options = {options}
  label = {label}
  inline
  onChange = {onChange}
  values = {values}
/>)
BoolFilter.propTypes = propTypes

export default BoolFilter
