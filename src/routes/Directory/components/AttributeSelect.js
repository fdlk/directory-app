import React, {Component, PropTypes} from 'react'
import {FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap'

const propTypes = {
  attributes : PropTypes.array.isRequired,
  onChange   : PropTypes.func
}

const AttributeSelect = ({attributes, onChange}) =>
  <FormGroup>
    <Col componentClass={ControlLabel} sm={4}>Select attribute</Col>
    <Col sm={8}>
      <FormControl componentClass="select" placeholder="select" onChange={onChange}>
        { attributes.map(attribute =>
          <option value={attribute.name} key={attribute.name}>{attribute.label}</option>) }
      </FormControl>
    </Col>
  </FormGroup>

AttributeSelect.propTypes = propTypes;
export default AttributeSelect;
