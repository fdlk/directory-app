import React, { PropTypes } from 'react'
import classes from './Directory.scss'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const propTypes = {
  queryPayload : PropTypes.string,
  items        : PropTypes.object
}

function format (cell, row) {
  return cell.id
}

export const Directory = ({ queryPayload, items }) => {
  return <div className={classes['Directory']}>
    <h4>Directory</h4>
    <h2>items</h2>
    <BootstrapTable pagination data={items} search>
      <TableHeaderColumn isKey dataField='id'>Collection ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name'>Collection name</TableHeaderColumn>
      <TableHeaderColumn dataFormat={format} dataField='biobank'>Biobank ID</TableHeaderColumn>

    </BootstrapTable>
    <ul />
    <pre>{JSON.stringify(queryPayload, null, 2)}</pre>
  </div>
}

Directory.propTypes = propTypes

export default Directory
