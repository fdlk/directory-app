import React, { PropTypes } from 'react'
import classes from './Directory.scss'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const propTypes = {
  rsql    : PropTypes.string,
  filters : PropTypes.object,
  items   : PropTypes.object
}

export const Directory = ({ rsql, filters, items }) => (
  <div className={classes['Directory']}>
    <h4>Directory</h4>
    RSQL: <pre>{rsql}</pre>
    filters: <pre>{JSON.stringify(filters, null, 2)}</pre>
  </div>
)

Directory.propTypes = propTypes

export default Directory
