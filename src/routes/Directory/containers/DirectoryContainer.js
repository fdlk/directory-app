import { connect } from 'react-redux'
import { getRsql, getHumanReadable } from '../modules/Directory'

import Directory from '../components/Directory'

const mapStateToProps = ({ Directory: state }) => ({
  rsql          : state && getRsql(state),
  humanReadable : state && getHumanReadable(state),
  filters       : state && state.filters,
  items         : state && state.items
})

export default connect(mapStateToProps, { })(Directory)
