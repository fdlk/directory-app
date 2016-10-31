import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Glyphicon, Form } from 'react-bootstrap'
import AttributeSelect from '../components/AttributeSelect'
import { getAttributes } from '../modules/Directory'
import { setAttribute, editFilter } from '../modules/EditFilter'
import { setFilter, removeFilter } from '../modules/Filters'
import { BoolFilter } from '../components/BoolFilter'

const propTypes = {
  attributes   : PropTypes.array,
  setAttribute : PropTypes.func,
  attribute    : PropTypes.string,
  filterValue  : PropTypes.array,
  editFilter   : PropTypes.func,
  setFilter    : PropTypes.func,
  removeFilter : PropTypes.func
}

const NewFilter = ({attributes, setAttribute, attribute, filterValue, editFilter, setFilter, removeFilter}) =>
<div>
  <AttributeSelect attributes={attributes} onChange={(e)=> {e.preventDefault(); setAttribute(e.target.value)}}/>
  {attribute &&
  <BoolFilter
    attribute = {attribute}
    label="Set filter values"
    onChange={(v) => {if(!v || v.length == 0){removeFilter(attribute);} else {setFilter(attribute, v);}}}
    values={filterValue || []}/>}
</div>

const mapStateToProps = (state) => ({
  attributes  : state.Directory && getAttributes(state.Directory).filter(attribute => attribute.fieldType === 'BOOL'),
  attribute   : state.Directory.editFilter.attribute,
  filterValue : (state.Directory && state.Directory.editFilter.attribute && state.Directory.filters[state.Directory.editFilter.attribute]) || [],
})

NewFilter.propTypes = propTypes;
export default connect(
  mapStateToProps,
  { setAttribute, editFilter, setFilter, removeFilter }
)(NewFilter);
