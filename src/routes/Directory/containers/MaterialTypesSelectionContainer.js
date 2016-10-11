import { connect } from 'react-redux'
import MaterialTypesSelection from '../components/MaterialTypesSelection'

// ------------------------------------
// Container / Presentation wrapping
// ------------------------------------

const mapStateToProps = (state) => {
  // Define how to retrieve options in view state
  function getQuery (input) {
    const termQueryParts = input
      .split(/\s+/)
      .filter(term => term.length)
      .map(term => `(label=q="${term.trim()}",description=q="${term.trim()}")`)
    return termQueryParts.join(';')
  }

  return {
    getQuery, value : [
      { label : 'DNA', id : 'DNA' },
      { label : 'DNA2', id : 'DNA2' }]
  }
}

const onChange = (selectedOption) => console.log('onChange', selectedOption)

const mapDispatchToProps = { onChange }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialTypesSelection)

