import React, {PropTypes} from 'react'
import classes from './Directory.scss'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Button} from 'react-bootstrap'
import FiltersContainer from '../containers/FiltersContainer'

const propTypes = {
  queryPayload  : PropTypes.object,
  items         : PropTypes.array,
  isUpdate      : PropTypes.bool,
  doNegotiate   : PropTypes.func
}

export const Directory = ({ queryPayload, items, doNegotiate, isUpdate }) => {
  return <div className={classes['Directory']}>
    <h4>Filters</h4>
    <FiltersContainer />
    {items &&
    <div><Button bsStyle='success' onClick={() => doNegotiate(queryPayload)}>
      {isUpdate ? "Update selection in negotiator" : "Start negotiation"}
    </Button>
    <h2>items</h2>
    <BootstrapTable pagination data={items} search>
      <TableHeaderColumn isKey dataField='id'>Collection ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name'>Collection name</TableHeaderColumn>
      <TableHeaderColumn dataFormat={cell => cell && cell.id} dataField='biobank'>Biobank ID</TableHeaderColumn>
    </BootstrapTable>
    </div>}
  </div>
}

Directory.propTypes = propTypes

export default Directory
