import React, { Component, PropTypes } from 'react';
import { FormGroup, Col, ControlLabel, Checkbox } from 'react-bootstrap'

const propTypes = {
  inline   : PropTypes.bool,
  label    : PropTypes.string,
  values   : PropTypes.array,
  options  : PropTypes.array,
  onChange : PropTypes.func
}

const CategoryFilter = ({label, values, options, inline, onChange}) => {
  const onCheckboxChange = (toggleValue) => {
    if(values.indexOf(toggleValue) >= 0){
      onChange(values.filter(v => v !== toggleValue))
    } else {
      onChange([toggleValue, ...values])
    }
  }
  return <FormGroup>
    <Col componentClass={ControlLabel} sm={4}>
      {label}
    </Col>
    <Col sm={8}>
      {options.map((option, index) =>
        <span key={option.value} >{inline && index > 0 ? '  ' : '' }
          <Checkbox inline={inline}
                    onChange={(e)=>{onCheckboxChange(option.value) }}
                    checked={values.indexOf(option.value) >= 0}>
            {option.label}
          </Checkbox>
        </span>)}
    </Col>
  </FormGroup>
}

CategoryFilter.propTypes = propTypes;
export default CategoryFilter;
