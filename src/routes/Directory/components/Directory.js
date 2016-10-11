import React, { PropTypes } from 'react'
import classes from './Directory.scss'

const propTypes = {
  rsql: PropTypes.string
}

export const Directory = ({ rsql }) => (
  <div className={classes['Directory']}>
    <h4>Directory</h4>
    RSQL: <pre>{rsql}</pre>
  </div>
)

Directory.propTypes = propTypes

export default Directory
