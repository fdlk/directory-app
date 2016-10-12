import React, { PropTypes } from 'react'
import classes from './Directory.scss'

const propTypes = {
  rsql          : PropTypes.string,
  humanReadable : PropTypes.string,
  filters       : PropTypes.object
}

export const Directory = ({ rsql, humanReadable, filters }) => (
  <div className={classes['Directory']}>
    <h4>Directory</h4>
    RSQL: <pre>{rsql}</pre>
    Human readable: <pre>{humanReadable}</pre>
    filters: <pre>{JSON.stringify(filters, null, 2)}</pre>
  </div>
)

Directory.propTypes = propTypes

export default Directory
