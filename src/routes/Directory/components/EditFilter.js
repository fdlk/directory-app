import React, {PropTypes} from 'react'
import Button from 'react-bootstrap'
import BoolFilter from './BoolFilter'
import { FormGroup, Col, FormControl } from 'react-bootstrap'

const propTypes = {
  attribute   : PropTypes.object.isRequired,
  value       : PropTypes.object,
  onChange    : PropTypes.func,
  setFilter : PropTypes.func,
  cancel    : PropTypes.func
}

export const EditFilter = ({attribute, value, onChange, setFilter, cancel}) => (
  <form>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={4}>
        {attribute.label}
      </Col>
      <Col sm={8}>
        <FormControl>

        </FormControl>
      </Col>
    </FormGroup>
    { attribute.fieldType === 'BOOL'
      ? <BoolFilter
        label={ attribute.label }
        value=value
        onChange={onChange} />
      : undefined }
    <Button onClick = { setFilter }>Set filter</Button>
    <Button onClick = { cancel }>Cancel</Button>
  </form>
)
EditFilter.propTypes = propTypes

export default EditFilter
