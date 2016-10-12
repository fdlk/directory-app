import React, {Component, PropTypes} from 'react'
import BoolFilter from './BoolFilter'

const propTypes = {
  sample_access_fee : PropTypes.bool,
  setFilter         : PropTypes.func,
  removeFilter      : PropTypes.func,
  rsql              : PropTypes.string,
  humanReadable     : PropTypes.string
}

export const Filters = ({sample_access_fee, setFilter, removeFilter, rsql, humanReadable}) => (
  <div>
    <BoolFilter
      label="Sample Access Fee"
      value={sample_access_fee}
      onChange={(value) => value === undefined
        ? removeFilter('sample_access_fee')
        : setFilter('sample_access_fee', value)}/>
    <hr />
    {rsql && <pre>{rsql}</pre>}
    {humanReadable && <ul>{humanReadable.split('\n').map((line, index) => <li key={index}>{line}</li>)}</ul>}
  </div>
)

Filters.propTypes = propTypes
export default Filters;
