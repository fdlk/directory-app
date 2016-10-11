import { connect } from 'react-redux'
import { getRsql } from '../modules/Directory'

import Directory from '../components/Directory'

const mapStateToProps = (state) => ({
  rsql : undefined
})

export default connect(mapStateToProps, { })(Directory)
