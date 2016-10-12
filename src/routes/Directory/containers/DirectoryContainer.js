import { connect } from 'react-redux'
import { getQueryPayload } from '../modules/Directory'

import Directory from '../components/Directory'

const mapStateToProps = ({ Directory: state }) => ({
  queryPayload : state && getQueryPayload(state),
  items        : state && state.items,
  nToken       : state && state.nToken
})

export default connect(mapStateToProps, { })(Directory)
