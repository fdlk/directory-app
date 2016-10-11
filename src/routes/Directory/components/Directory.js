import React from 'react'
import classes from './Directory.scss'
import MaterialTypesSelectionContainer from '../containers/MaterialTypesSelectionContainer'

export const Directory = () => (
  <div className={classes['Directory']}>
    <h4>Directory</h4>
    <MaterialTypesSelectionContainer />
  </div>
)

export default Directory
