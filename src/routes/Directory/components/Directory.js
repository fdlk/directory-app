import React, { PropTypes } from 'react'
import classes from './Directory.scss'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'

const propTypes = {
  queryPayload : PropTypes.object,
  items        : PropTypes.array,
  isUpdate     : PropTypes.bool,
  doNegotiate  : PropTypes.func
}

export const Directory = ({ queryPayload, items, doNegotiate, isUpdate }) => {
  return <div className={classes['Directory']}>
    <h4>Directory</h4>
    <Button bsStyle='success' onClick={() => doNegotiate(queryPayload)}>
      {isUpdate ? "Update selection in negotiator" : "Start negotiation"}
    </Button>
    <pre>{JSON.stringify(queryPayload, null, 2)}</pre>
    <h2>items</h2>
    <BootstrapTable pagination data={items} search>
      <TableHeaderColumn isKey dataField='id'>Collection ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name'>Collection name</TableHeaderColumn>
      <TableHeaderColumn dataFormat={cell => cell.id} dataField='biobank'>Biobank ID</TableHeaderColumn>
    </BootstrapTable>
  </div>
}

Directory.propTypes = propTypes

export default Directory
