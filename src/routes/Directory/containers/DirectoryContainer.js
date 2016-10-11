import { connect } from 'react-redux'
import { getRsql } from '../modules/Directory'

import Directory from '../components/Directory'

const mapStateToProps = ({ Directory: state }) => ({
  rsql    : state && getRsql(state),
  filters : state && state.filters
})

export default connect(mapStateToProps, { })(Directory)
