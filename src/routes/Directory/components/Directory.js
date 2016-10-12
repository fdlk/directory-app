import React, { PropTypes } from 'react'
import classes from './Directory.scss'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const propTypes = {
  queryPayload : PropTypes.string,
  items        : PropTypes.object
}

export const Directory = ({ queryPayload, items }) => (
  <div className={classes['Directory']}>
    <h4>Directory</h4>
    query payload: <pre>{JSON.stringify(queryPayload, null, 2)}</pre>
  </div>
)

Directory.propTypes = propTypes

export default Directory
