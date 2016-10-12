import { connect } from 'react-redux'
import { getQueryPayload, doNegotiate } from '../modules/Directory'

import Directory from '../components/Directory'

const mapStateToProps = ({ Directory: state }) => ({
  queryPayload : state && getQueryPayload(state),
  items        : state && state.entities.items,
  isUpdate     : state && state.nToken ? true : false,
  doNegotiate  : state && doNegotiate
})

export default connect(mapStateToProps, { })(Directory)
