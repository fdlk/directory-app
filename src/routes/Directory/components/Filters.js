import React, {Component, PropTypes} from 'react'
import { Form } from 'react-bootstrap'
import NewFilter from '../containers/NewFilter'

const propTypes = {
  setFilter         : PropTypes.func,
  removeFilter      : PropTypes.func,
  rsql              : PropTypes.string,
  humanReadable     : PropTypes.string,
  attributes        : PropTypes.array
}

export const Filters = ({setFilter, removeFilter, rsql, humanReadable, attributes}) => (
  <Form horizontal>
    {attributes && <NewFilter/>}
    <hr />
    {rsql && <pre>{rsql}</pre>}
    {humanReadable && <ul>{humanReadable.split('\n').map((line, index) => <li key={index}>{line}</li>)}</ul>}
  </Form>
)

Filters.propTypes = propTypes
export default Filters;
