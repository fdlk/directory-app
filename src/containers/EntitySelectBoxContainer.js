import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import 'react-select/dist/react-select.css'
import ReactSelect from 'react-select'
import { get } from 'redux/modules/MolgenisApi'

const propTypes = {
  loadOptions : PropTypes.func,
  onChange    : PropTypes.func,
  getOption   : PropTypes.func,
  value       : PropTypes.array
}

/**
 * This is the dumb presentation component for the Entity select box.
 */
class EntitySelectBox extends Component {
  render () {
    const { loadOptions, onChange, value } = this.props
    return <ReactSelect.Async cache={null}
      filterOptions={false}
      loadOptions={loadOptions}
      onChange={onChange}
      value={value}
      {...this.props} />
  }
}
EntitySelectBox.propTypes = propTypes

// these two methods are used to wrap a container component around the presentation component above
const mapStateToProps = ({ session: { server, token } },
  { entityName, getQuery, attrs, getOption, value, labelKey, valueKey, multi, simpleValue }) => {
  // retrieval of options happens in view state, define here how to retrieve them.
  function getUrl (input = '') {
    const q = getQuery(input)
    const params = { q, attrs }
    const query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
    return `/v2/${entityName}?${query}`
  }

  const loadOptions = (input) => {
    return get(server, getUrl(input), token).then((json) => {
      return {
        options  : json.items.map(getOption),
        complete : false
      }
    })
  }
  return { loadOptions, value, labelKey, valueKey, multi, simpleValue }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntitySelectBox)
